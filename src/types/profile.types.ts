export interface ProfileCollection {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  companyAddress: string;
  allowRegistration: boolean;
}

export interface ProfileAction {
  addCompanyProfile(profile: ProfileCollection): Promise<any>;
  updateCompanyProfile(
    recordId: string,
    updatedFields: Partial<ProfileCollection>,
  ): Promise<any>;
  deleteCompanyProfile(recordId: string): Promise<any>;
  createProfileCollection(): Promise<any>;
}

export interface ProfileService {
  listAllCompanyProfiles(): Promise<ProfileCollection[]>;
  checkProfileCollectionExists(): Promise<boolean>;
}
