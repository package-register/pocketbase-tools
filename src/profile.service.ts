import type { ProfileCollection } from "./types/profile.types";

export interface ProfileService {
  addCompanyProfile(profile: ProfileCollection): Promise<any>;
  updateCompanyProfile(
    recordId: string,
    updatedFields: Partial<ProfileCollection>,
  ): Promise<any>;
  deleteCompanyProfile(recordId: string): Promise<any>;
  createProfileCollection(): Promise<any>;
  listAllCompanyProfiles(): Promise<ProfileCollection[]>;
  checkProfileCollectionExists(): Promise<boolean>;
}

export * from "./profile.action";
