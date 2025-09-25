#!/bin/bash

# ==============================================================================
# 配置部分
# ==============================================================================
PB_VERSION="0.30.0" 
PB_LOCAL_DIR="./pb_bin"       # **修改: 优先安装到当前目录下的 pb_bin 子目录**
PB_BIN="$PB_LOCAL_DIR/pocketbase"
DOWNLOAD_URL_BASE="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}"
PB_DATA_DIR="./pb_data" # 默认数据目录 (保持在当前目录)

# SHA256 校验码字典 (仅包含 macOS 和 Linux 的 amd64/arm64)
declare -A SHA256_MAP
SHA256_MAP[darwin_amd64]="f4edcd250375094703a258fb571e14bb84f5636b31bd7d4c414125005b5c1d81"
SHA256_MAP[darwin_arm64]="a97b6c3a9b45cf7ce5eb56ec2c8df69c6b5015381c3a785b905347d93d600983"
SHA256_MAP[linux_amd64]="fa3b8b78e268b9f04ebe4aa4962e7321a2c02dce5f60dc92473f384738f06db8"
SHA256_MAP[linux_arm64]="1e3d7b11957a17ec7c753749b244b11988cb8ad9d16241a92cb0f971f92376cb"

# ==============================================================================
# 0. 加载和检查管理员账号
# ==============================================================================
load_credentials() {
    # 优先从 .env 文件加载
    if [ -f .env ]; then
        echo "🔎 正在从 .env 文件加载管理员凭证..."
        # 使用 grep 和 sed 安全地提取变量
        SUPERUSER_EMAIL=$(grep '^PB_ADMIN_EMAIL=' .env | sed 's/PB_ADMIN_EMAIL=//' | tr -d '"' | tr -d "'")
        SUPERUSER_PASSWORD=$(grep '^PB_ADMIN_PASS=' .env | sed 's/PB_ADMIN_PASS=//' | tr -d '"' | tr -d "'")
    fi

    # 如果 .env 缺少，从命令行参数加载
    if [ -z "$SUPERUSER_EMAIL" ] && [ -n "$1" ]; then
        SUPERUSER_EMAIL="$1"
    fi
    if [ -z "$SUPERUSER_PASSWORD" ] && [ -n "$2" ]; then
        SUPERUSER_PASSWORD="$2"
    fi

    # 最终检查
    if [ -z "$SUPERUSER_EMAIL" ] || [ -z "$SUPERUSER_PASSWORD" ]; then
        echo "错误: 缺少超级管理员邮箱或密码。"
        echo "请在 .env 文件中设置 PB_ADMIN_EMAIL 和 PB_ADMIN_PASS，或通过命令行参数传入。"
        echo "使用方法: $0 <SUPERUSER_EMAIL> <SUPERUSER_PASSWORD>"
        exit 1
    fi
    echo "✅ 管理员凭证加载成功 (邮箱: $SUPERUSER_EMAIL)"
}

# ==============================================================================
# 1. 自动判断系统架构和下载链接
# ==============================================================================
get_arch_os() {
    # ... (此函数与之前相同，确保 TARGET_ARCH 正确设置)
    OS_TYPE=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH_TYPE=$(uname -m)

    if [ "$OS_TYPE" == "linux" ]; then
        if [ "$ARCH_TYPE" == "x86_64" ]; then
            TARGET_ARCH="linux_amd64"
        elif [ "$ARCH_TYPE" == "aarch64" ]; then
            TARGET_ARCH="linux_arm64"
        else
            echo "错误: 不支持的 Linux 架构 ($ARCH_TYPE)。"
            exit 1
        fi
    elif [ "$OS_TYPE" == "darwin" ]; then
        if [ "$ARCH_TYPE" == "x86_64" ]; then
            TARGET_ARCH="darwin_amd64"
        elif [ "$ARCH_TYPE" == "arm64" ]; then
            TARGET_ARCH="darwin_arm64"
        else
            echo "错误: 不支持的 macOS 架构 ($ARCH_TYPE)。"
            exit 1
        fi
    else
        echo "错误: 仅支持 Linux 和 macOS 系统。"
        exit 1
    fi

    if [ -z "${SHA256_MAP[$TARGET_ARCH]}" ]; then
        echo "错误: 找不到 ${TARGET_ARCH} 架构的 SHA256 校验码。"
        exit 1
    fi

    DOWNLOAD_URL="${DOWNLOAD_URL_BASE}_${TARGET_ARCH}.zip"
    EXPECTED_SHA256="${SHA256_MAP[$TARGET_ARCH]}"
    ZIP_FILE="/tmp/pocketbase_${PB_VERSION}_${TARGET_ARCH}.zip"

    echo "系统信息: $OS_TYPE / $ARCH_TYPE -> $TARGET_ARCH"
}

# ==============================================================================
# 2. 检查、下载、校验、安装 (已修复权限问题)
# ==============================================================================
install_pocketbase() {
    if [ -f "$PB_BIN" ]; then
        echo "✅ PocketBase 已存在于 $PB_BIN，跳过安装。"
        return 0
    fi
    
    echo "🚀 正在下载 PocketBase v$PB_VERSION..."
    if ! command -v curl &> /dev/null; then
        echo "错误: curl 未安装。请先安装 curl。"
        exit 1
    fi
    
    curl -L -o "$ZIP_FILE" "$DOWNLOAD_URL"
    if [ $? -ne 0 ]; then
        echo "错误: 下载 PocketBase 失败。"
        exit 1
    fi

    # 校验文件
    echo "🔎 正在校验 SHA256..."
    if command -v shasum &> /dev/null; then
        ACTUAL_SHA256=$(shasum -a 256 "$ZIP_FILE" | awk '{print $1}')
    elif command -v sha256sum &> /dev/null; then
        ACTUAL_SHA256=$(sha256sum "$ZIP_FILE" | awk '{print $1}')
    else
        echo "警告: 找不到校验命令。跳过校验，继续安装。"
        ACTUAL_SHA256=$EXPECTED_SHA256
    fi
    
    if [ "$ACTUAL_SHA256" != "$EXPECTED_SHA256" ]; then
        echo "❌ SHA256 校验失败!"
        rm -f "$ZIP_FILE"
        exit 1
    fi
    echo "✅ SHA256 校验成功!"


    echo "📦 正在解压并安装到 $PB_LOCAL_DIR..."
    if ! command -v unzip &> /dev/null; then
        echo "错误: unzip 未安装。请先安装 unzip。"
        exit 1
    fi

    # 确保本地安装目录存在
    mkdir -p "$PB_LOCAL_DIR"

    # 解压并移动二进制文件
    unzip -o "$ZIP_FILE" -d /tmp/pb_temp
    
    # **核心修复: 移动到本地目录**
    mv /tmp/pb_temp/pocketbase "$PB_BIN" 
    
    # **赋予执行权限**
    chmod +x "$PB_BIN"
    rm -rf /tmp/pb_temp
    rm -f "$ZIP_FILE"
    
    echo "🎉 PocketBase 安装完成！路径: $PB_BIN"
}


# ==============================================================================
# 3. 初始化超级管理员
# ==============================================================================
init_superuser() {
    # 检查数据目录是否已经存在，以此判断是否为首次运行
    if [ -d "$PB_DATA_DIR" ]; then
        echo "⚠️ 数据目录 $PB_DATA_DIR 已存在。跳过超级管理员初始化。"
        return 0
    fi
    
    echo "🔑 正在初始化超级管理员账户..."
    
    # 运行 superuser create 命令
    # 确保使用双引号保护密码中的特殊字符
    "$PB_BIN" superuser create "$SUPERUSER_EMAIL" "$SUPERUSER_PASSWORD"
    
    if [ $? -eq 0 ]; then
        echo "✅ 超级管理员账户创建成功!"
        echo "   邮箱: $SUPERUSER_EMAIL"
    else
        echo "❌ 警告: 创建超级管理员账户失败。请检查日志。"
        exit 1
    fi
}


# ==============================================================================
# 4. 运行服务
# ==============================================================================
start_service() {
    echo "🌐 正在启动 PocketBase 服务 (后台运行)..."
    
    # 在后台运行 PocketBase，并将输出重定向到日志文件
    # 使用完整的本地路径启动
    nohup "$PB_BIN" serve > ./pocketbase.log 2>&1 &
    
    if [ $? -eq 0 ]; then
        echo "✅ PocketBase 已在后台启动 (PID: $!)。"
        echo "   日志文件: ./pocketbase.log"
        echo "   默认管理面板: http://127.0.0.1:8090/_/"
    else
        echo "❌ 启动 PocketBase 服务失败。"
    fi
}

change_setup_env() {
    cp ./setup.env .env
}

# ==============================================================================
# 运行主流程
# ==============================================================================
change_setup_env
load_credentials "$@" # 传入所有参数
get_arch_os
install_pocketbase
init_superuser
start_service