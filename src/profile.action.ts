import pb, { profileCollect } from "./base";
import { ProfileCollection } from "./types";
import { withErrorHandling } from "./utils/errorHandler";

// 获取所有公司资料
export async function listAllCompanyProfiles() {
  return withErrorHandling("列出所有记录", async () => {
    return await profileCollect.getFullList();
  });
}

// 检查 profile 表是否存在
export async function checkProfileCollectionExists() {
  return withErrorHandling("检查 profile 表是否存在", async () => {
    const collections = await pb.collections.getFullList();
    return !!collections.find((collection) => collection.name === "profile");
  });
}

// 创建 profile 表结构
export async function createProfileCollection() {
  return withErrorHandling("创建 profile 表结构", async () => {
    return await pb.collections.create({
      name: "profile",
      type: "base",
      listRule: '@request.auth.id != ""',
      fields: [
        { name: "companyName", type: "text", required: true },
        { name: "contactEmail", type: "text", required: true },
        { name: "contactPhone", type: "text", required: true },
        { name: "companyAddress", type: "text", required: true },
        { name: "allowRegistration", type: "bool", required: true },
      ],
    });
  });
}

// 添加公司资料
export function addCompanyProfile(
  companyNameOrProfile: string | ProfileCollection,
  contactEmail?: string,
  contactPhone?: string,
  companyAddress?: string,
  allowRegistration?: boolean,
) {
  return withErrorHandling("添加公司数据", async () => {
    let profile: ProfileCollection;
    if (typeof companyNameOrProfile === "object") {
      profile = companyNameOrProfile;
    } else {
      profile = {
        companyName: companyNameOrProfile,
        contactEmail: contactEmail!,
        contactPhone: contactPhone!,
        companyAddress: companyAddress!,
        allowRegistration: allowRegistration!,
      };
    }
    return await profileCollect.create(profile);
  });
}

// 更新公司资料
export async function updateCompanyProfile(
  recordId: string,
  updatedFields: Partial<ProfileCollection>,
) {
  return withErrorHandling("更新记录", async () => {
    return await profileCollect.update(recordId, updatedFields);
  });
}

// 删除公司资料
export async function deleteCompanyProfile(recordId: string) {
  return withErrorHandling("删除记录", async () => {
    return await profileCollect.delete(recordId);
  });
}
