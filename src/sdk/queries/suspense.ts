// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AllergyControllerService, AppointmentManagementService, AppointmentTypeManagementService, AvailabilityManagementService, ClinicControllerService, ClinicalTemplateService, DocumentTypeControllerService, FeeScheduleControllerService, InsurancePayerControllerService, IntakeFormConsentTemplateService, LicenseStateControllerService, LocationControllerService, MedicalCodeControllerService, MigrationControllerService, PatientAllergyControllerService, PatientClinicControllerService, PatientControllerService, PatientDiagnosisControllerService, PatientDocumentControllerService, PatientFamilyHistoryControllerService, PatientFlagControllerService, PatientInsuranceControllerService, PatientMedicalHistoryControllerService, PatientSurgicalHistoryControllerService, PatientVaccineControllerService, PharmacyLabRadiologyControllerService, PrintConfigurationControllerService, ProviderControllerService, RequestAppointmentManagementService, SpecialityControllerService, StickyNoteControllerService, StripeControllerService, TextMacroControllerService, UserControllerService, VaccinesControllerService, VideoControllerService, VisitNoteTemplateService } from "../requests/services.gen";
import * as Common from "./common";
export const useUserControllerServiceGetApiMasterUsersSuspense = <TData = Common.UserControllerServiceGetApiMasterUsersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserControllerServiceGetApiMasterUsersKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => UserControllerService.getApiMasterUsers({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const useUserControllerServiceGetApiMasterUserByUserIdSuspense = <TData = Common.UserControllerServiceGetApiMasterUserByUserIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId }: {
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserControllerServiceGetApiMasterUserByUserIdKeyFn({ userId }, queryKey), queryFn: () => UserControllerService.getApiMasterUserByUserId({ userId }) as TData, ...options });
export const useUserControllerServiceGetApiMasterProfileSuspense = <TData = Common.UserControllerServiceGetApiMasterProfileDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserControllerServiceGetApiMasterProfileKeyFn(queryKey), queryFn: () => UserControllerService.getApiMasterProfile() as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateSuspense = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateName, templateType }) as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdSuspense = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ templateId }: {
  templateId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateByTemplateIdKeyFn({ templateId }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateByTemplateId({ templateId }) as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidSuspense = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeSuspense = <TData = Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }, queryKey), queryFn: () => VisitNoteTemplateService.getApiMasterVisitNoteTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) as TData, ...options });
export const useTextMacroControllerServiceGetApiMasterTextMacroSuspense = <TData = Common.TextMacroControllerServiceGetApiMasterTextMacroDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, page, size, sortBy, sortDirection, title }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroKeyFn({ clinicUuid, page, size, sortBy, sortDirection, title }, queryKey), queryFn: () => TextMacroControllerService.getApiMasterTextMacro({ clinicUuid, page, size, sortBy, sortDirection, title }) as TData, ...options });
export const useTextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdSuspense = <TData = Common.TextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ textMacroId }: {
  textMacroId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroByTextMacroIdKeyFn({ textMacroId }, queryKey), queryFn: () => TextMacroControllerService.getApiMasterTextMacroByTextMacroId({ textMacroId }) as TData, ...options });
export const useStickyNoteControllerServiceGetApiMasterStickyNotesSuspense = <TData = Common.StickyNoteControllerServiceGetApiMasterStickyNotesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesKeyFn({ archive, page, patientClinicUuid, size, sort, sortBy, status }, queryKey), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotes({ archive, page, patientClinicUuid, size, sort, sortBy, status }) as TData, ...options });
export const useStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdSuspense = <TData = Common.StickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ stickyNoteId }: {
  stickyNoteId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesByStickyNoteIdKeyFn({ stickyNoteId }, queryKey), queryFn: () => StickyNoteControllerService.getApiMasterStickyNotesByStickyNoteId({ stickyNoteId }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderSuspense = <TData = Common.ProviderControllerServiceGetApiMasterProviderDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProvider({ archive, clinicId, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderByProviderIdSuspense = <TData = Common.ProviderControllerServiceGetApiMasterProviderByProviderIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ providerId }: {
  providerId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdKeyFn({ providerId }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderId({ providerId }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderByProviderIdClinicsSuspense = <TData = Common.ProviderControllerServiceGetApiMasterProviderByProviderIdClinicsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, isProvider, providerId }: {
  active?: boolean;
  archive?: boolean;
  isProvider?: boolean;
  providerId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderByProviderIdClinicsKeyFn({ active, archive, isProvider, providerId }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderByProviderIdClinics({ active, archive, isProvider, providerId }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderUserByUserUuidSuspense = <TData = Common.ProviderControllerServiceGetApiMasterProviderUserByUserUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userUuid }: {
  userUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderUserByUserUuidKeyFn({ userUuid }, queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderUserByUserUuid({ userUuid }) as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderProfileSuspense = <TData = Common.ProviderControllerServiceGetApiMasterProviderProfileDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderProfileKeyFn(queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderProfile() as TData, ...options });
export const useProviderControllerServiceGetApiMasterProviderCountsSuspense = <TData = Common.ProviderControllerServiceGetApiMasterProviderCountsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProviderControllerServiceGetApiMasterProviderCountsKeyFn(queryKey), queryFn: () => ProviderControllerService.getApiMasterProviderCounts() as TData, ...options });
export const usePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidSuspense = <TData = Common.PrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePrintConfigurationControllerServiceGetApiMasterPrintConfigurationClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => PrintConfigurationControllerService.getApiMasterPrintConfigurationClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatientSuspense = <TData = Common.PatientControllerServiceGetApiMasterPatientDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientKeyFn({ archive, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientControllerService.getApiMasterPatient({ archive, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatientByPatientIdSuspense = <TData = Common.PatientControllerServiceGetApiMasterPatientByPatientIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientId }: {
  patientId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdKeyFn({ patientId }, queryKey), queryFn: () => PatientControllerService.getApiMasterPatientByPatientId({ patientId }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatientByPatientIdSignatureSuspense = <TData = Common.PatientControllerServiceGetApiMasterPatientByPatientIdSignatureDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientId }: {
  patientId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientByPatientIdSignatureKeyFn({ patientId }, queryKey), queryFn: () => PatientControllerService.getApiMasterPatientByPatientIdSignature({ patientId }) as TData, ...options });
export const usePatientControllerServiceGetApiMasterPatientProfileSuspense = <TData = Common.PatientControllerServiceGetApiMasterPatientProfileDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientControllerServiceGetApiMasterPatientProfileKeyFn(queryKey), queryFn: () => PatientControllerService.getApiMasterPatientProfile() as TData, ...options });
export const usePatientVaccineControllerServiceGetApiMasterPatientVaccineSuspense = <TData = Common.PatientVaccineControllerServiceGetApiMasterPatientVaccineDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccine({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdSuspense = <TData = Common.PatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientVaccineId }: {
  patientVaccineId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineByPatientVaccineIdKeyFn({ patientVaccineId }, queryKey), queryFn: () => PatientVaccineControllerService.getApiMasterPatientVaccineByPatientVaccineId({ patientVaccineId }) as TData, ...options });
export const usePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistorySuspense = <TData = Common.PatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdSuspense = <TData = Common.PatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientSurgicalHistoryId }: {
  patientSurgicalHistoryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryIdKeyFn({ patientSurgicalHistoryId }, queryKey), queryFn: () => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistoryByPatientSurgicalHistoryId({ patientSurgicalHistoryId }) as TData, ...options });
export const usePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistorySuspense = <TData = Common.PatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdSuspense = <TData = Common.PatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientMedicalHistoryId }: {
  patientMedicalHistoryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryByPatientMedicalHistoryIdKeyFn({ patientMedicalHistoryId }, queryKey), queryFn: () => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistoryByPatientMedicalHistoryId({ patientMedicalHistoryId }) as TData, ...options });
export const usePatientInsuranceControllerServiceGetApiMasterPatientInsuranceSuspense = <TData = Common.PatientInsuranceControllerServiceGetApiMasterPatientInsuranceDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  insuranceType?: "PRIMARY" | "SECONDARY" | "TERTIARY" | "OTHER";
  page?: number;
  patientClinicUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceKeyFn({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurance({ active, archive, clinicUuid, insuranceType, page, patientClinicUuid, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const usePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdSuspense = <TData = Common.PatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientInsuranceId }: {
  patientInsuranceId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceByPatientInsuranceIdKeyFn({ patientInsuranceId }, queryKey), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsuranceByPatientInsuranceId({ patientInsuranceId }) as TData, ...options });
export const usePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidSuspense = <TData = Common.PatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, patientClinicUuid }: {
  active?: boolean;
  archive?: boolean;
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsurancePatientClinicByPatientClinicUuidKeyFn({ active, archive, patientClinicUuid }, queryKey), queryFn: () => PatientInsuranceControllerService.getApiMasterPatientInsurancePatientClinicByPatientClinicUuid({ active, archive, patientClinicUuid }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagSuspense = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagKeyFn({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlag({ archive, clinicUuid, page, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdSuspense = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientFlagId }: {
  patientFlagId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagByPatientFlagIdKeyFn({ patientFlagId }, queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagByPatientFlagId({ patientFlagId }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidSuspense = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientClinicUuid }: {
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }, queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagPatientClinicByPatientClinicUuid({ patientClinicUuid }) as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdSuspense = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagClinicByClinicIdKeyFn(queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagClinicByClinicId() as TData, ...options });
export const usePatientFlagControllerServiceGetApiMasterPatientFlagActiveSuspense = <TData = Common.PatientFlagControllerServiceGetApiMasterPatientFlagActiveDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagActiveKeyFn(queryKey), queryFn: () => PatientFlagControllerService.getApiMasterPatientFlagActive() as TData, ...options });
export const usePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistorySuspense = <TData = Common.PatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistory({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdSuspense = <TData = Common.PatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientFamilyHistoryId }: {
  patientFamilyHistoryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryByPatientFamilyHistoryIdKeyFn({ patientFamilyHistoryId }, queryKey), queryFn: () => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistoryByPatientFamilyHistoryId({ patientFamilyHistoryId }) as TData, ...options });
export const usePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdSuspense = <TData = Common.PatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientDocumentId }: {
  patientDocumentId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentByPatientDocumentIdKeyFn({ patientDocumentId }, queryKey), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentByPatientDocumentId({ patientDocumentId }) as TData, ...options });
export const usePatientDocumentControllerServiceGetApiMasterPatientDocumentListSuspense = <TData = Common.PatientDocumentControllerServiceGetApiMasterPatientDocumentListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  assigned?: boolean;
  page?: number;
  patientId?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentListKeyFn({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientDocumentControllerService.getApiMasterPatientDocumentList({ archive, assigned, page, patientId, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisSuspense = <TData = Common.PatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisKeyFn({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosis({ archive, page, patientClinicUuid, searchString, size, sortBy, sortDirection, status }) as TData, ...options });
export const usePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdSuspense = <TData = Common.PatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientDiagnosisId }: {
  patientDiagnosisId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisByPatientDiagnosisIdKeyFn({ patientDiagnosisId }, queryKey), queryFn: () => PatientDiagnosisControllerService.getApiMasterPatientDiagnosisByPatientDiagnosisId({ patientDiagnosisId }) as TData, ...options });
export const usePatientClinicControllerServiceGetApiMasterPatientClinicSuspense = <TData = Common.PatientClinicControllerServiceGetApiMasterPatientClinicDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  patientUuid?: string;
  primaryProviderUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicKeyFn({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinic({ active, archive, clinicUuid, page, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const usePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidSuspense = <TData = Common.PatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientClinicUuid }: {
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }, queryKey), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicByPatientClinicUuid({ patientClinicUuid }) as TData, ...options });
export const usePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidSuspense = <TData = Common.PatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientUuid }: {
  patientUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicPatientByPatientUuidKeyFn({ patientUuid }, queryKey), queryFn: () => PatientClinicControllerService.getApiMasterPatientClinicPatientByPatientUuid({ patientUuid }) as TData, ...options });
export const usePatientAllergyControllerServiceGetApiMasterPatientAllergySuspense = <TData = Common.PatientAllergyControllerServiceGetApiMasterPatientAllergyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyKeyFn({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergy({ archive, page, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, ...options });
export const usePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdSuspense = <TData = Common.PatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientAllergyId }: {
  patientAllergyId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyByPatientAllergyIdKeyFn({ patientAllergyId }, queryKey), queryFn: () => PatientAllergyControllerService.getApiMasterPatientAllergyByPatientAllergyId({ patientAllergyId }) as TData, ...options });
export const useMedicalCodeControllerServiceGetApiMasterMedicalCodesSuspense = <TData = Common.MedicalCodeControllerServiceGetApiMasterMedicalCodesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, page, searchString, size, sort, sortBy, type }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesKeyFn({ active, archive, page, searchString, size, sort, sortBy, type }, queryKey), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodes({ active, archive, page, searchString, size, sort, sortBy, type }) as TData, ...options });
export const useMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdSuspense = <TData = Common.MedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ medicalCodeId }: {
  medicalCodeId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesByMedicalCodeIdKeyFn({ medicalCodeId }, queryKey), queryFn: () => MedicalCodeControllerService.getApiMasterMedicalCodesByMedicalCodeId({ medicalCodeId }) as TData, ...options });
export const useLocationControllerServiceGetApiMasterLocationSuspense = <TData = Common.LocationControllerServiceGetApiMasterLocationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationKeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: () => LocationControllerService.getApiMasterLocation({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) as TData, ...options });
export const useLocationControllerServiceGetApiMasterLocationByLocationIdSuspense = <TData = Common.LocationControllerServiceGetApiMasterLocationByLocationIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ locationId }: {
  locationId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationByLocationIdKeyFn({ locationId }, queryKey), queryFn: () => LocationControllerService.getApiMasterLocationByLocationId({ locationId }) as TData, ...options });
export const useLocationControllerServiceGetApiMasterLocationV2Suspense = <TData = Common.LocationControllerServiceGetApiMasterLocationV2DefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLocationControllerServiceGetApiMasterLocationV2KeyFn({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: () => LocationControllerService.getApiMasterLocationV2({ archive, clinicId, page, searchString, size, sortBy, sortDirection, state, status }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidSuspense = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
  uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateByUuidKeyFn({ uuid }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateByUuid({ uuid }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidSuspense = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ patientClinicUuid }: {
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidKeyFn({ patientClinicUuid }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuid({ patientClinicUuid }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeSuspense = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ formType, patientClinicUuid }: {
  formType: "CONSENT_FORM" | "INTAKE_FORM";
  patientClinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormTypeKeyFn({ formType, patientClinicUuid }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplatePatientClinicByPatientClinicUuidTypeByFormType({ formType, patientClinicUuid }) as TData, ...options });
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllSuspense = <TData = Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }: {
  active?: boolean;
  formType?: "CONSENT_FORM" | "INTAKE_FORM";
  page?: number;
  patientClinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllKeyFn({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }, queryKey), queryFn: () => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateAll({ active, formType, page, patientClinicUuid, size, sortBy, sortDirection, templateName }) as TData, ...options });
export const useFeeScheduleControllerServiceGetApiMasterFeeScheduleSuspense = <TData = Common.FeeScheduleControllerServiceGetApiMasterFeeScheduleDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, page, searchString, size }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleKeyFn({ active, archive, page, searchString, size }, queryKey), queryFn: () => FeeScheduleControllerService.getApiMasterFeeSchedule({ active, archive, page, searchString, size }) as TData, ...options });
export const useFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdSuspense = <TData = Common.FeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ feeScheduleId }: {
  feeScheduleId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleByFeeScheduleIdKeyFn({ feeScheduleId }, queryKey), queryFn: () => FeeScheduleControllerService.getApiMasterFeeScheduleByFeeScheduleId({ feeScheduleId }) as TData, ...options });
export const useDocumentTypeControllerServiceGetApiMasterDocumentTypeSuspense = <TData = Common.DocumentTypeControllerServiceGetApiMasterDocumentTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeKeyFn({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentType({ active, archive, clinicUuid, page, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const useDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdSuspense = <TData = Common.DocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ documentTypeId }: {
  documentTypeId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeByDocumentTypeIdKeyFn({ documentTypeId }, queryKey), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeByDocumentTypeId({ documentTypeId }) as TData, ...options });
export const useDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidSuspense = <TData = Common.DocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => DocumentTypeControllerService.getApiMasterDocumentTypeClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateSuspense = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }: {
  active?: boolean;
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateKeyFn({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplate({ active, clinicUuid, page, size, sortBy, sortDirection, templateType, title }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdSuspense = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ templateId }: {
  templateId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateByTemplateIdKeyFn({ templateId }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateByTemplateId({ templateId }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidSuspense = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid }: {
  clinicUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidKeyFn({ clinicUuid }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuid({ clinicUuid }) as TData, ...options });
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeSuspense = <TData = Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, templateType }: {
  clinicUuid: string;
  templateType: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateTypeKeyFn({ clinicUuid, templateType }, queryKey), queryFn: () => ClinicalTemplateService.getApiMasterClinicalTemplateClinicByClinicUuidTypeByTemplateType({ clinicUuid, templateType }) as TData, ...options });
export const useClinicControllerServiceGetApiMasterClinicSuspense = <TData = Common.ClinicControllerServiceGetApiMasterClinicDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, page, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicKeyFn({ archive, page, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: () => ClinicControllerService.getApiMasterClinic({ archive, page, searchString, size, sortBy, sortDirection, state, status }) as TData, ...options });
export const useClinicControllerServiceGetApiMasterClinicByClinicIdSuspense = <TData = Common.ClinicControllerServiceGetApiMasterClinicByClinicIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicId }: {
  clinicId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseClinicControllerServiceGetApiMasterClinicByClinicIdKeyFn({ clinicId }, queryKey), queryFn: () => ClinicControllerService.getApiMasterClinicByClinicId({ clinicId }) as TData, ...options });
export const useAppointmentManagementServiceGetApiMasterAppointmentsSuspense = <TData = Common.AppointmentManagementServiceGetApiMasterAppointmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }: {
  active?: boolean;
  appointmentModes?: string;
  appointmentStatuses?: string;
  appointmentTypes?: string;
  archive?: boolean;
  clinicUuid?: string;
  endDate?: string;
  locationUuid?: string[];
  page?: number;
  patientUuid?: string;
  providerUuid?: string[];
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  startDate?: string;
  timeFilter?: "ALL" | "UPCOMING" | "PAST";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsKeyFn({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }, queryKey), queryFn: () => AppointmentManagementService.getApiMasterAppointments({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }) as TData, ...options });
export const useAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdSuspense = <TData = Common.AppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ appointmentId }: {
  appointmentId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsByAppointmentIdKeyFn({ appointmentId }, queryKey), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsByAppointmentId({ appointmentId }) as TData, ...options });
export const useAppointmentManagementServiceGetApiMasterAppointmentsTodaySuspense = <TData = Common.AppointmentManagementServiceGetApiMasterAppointmentsTodayDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsTodayKeyFn(queryKey), queryFn: () => AppointmentManagementService.getApiMasterAppointmentsToday() as TData, ...options });
export const useAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidSuspense = <TData = Common.AppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
  uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesByUuidKeyFn({ uuid }, queryKey), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypesByUuid({ uuid }) as TData, ...options });
export const useAppointmentTypeManagementServiceGetApiMasterAppointmentTypesSuspense = <TData = Common.AppointmentTypeManagementServiceGetApiMasterAppointmentTypesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, size, title }: {
  page?: number;
  size?: number;
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesKeyFn({ page, size, title }, queryKey), queryFn: () => AppointmentTypeManagementService.getApiMasterAppointmentTypes({ page, size, title }) as TData, ...options });
export const useStripeControllerServiceGetApiMasterStripeByClinicIdSuspense = <TData = Common.StripeControllerServiceGetApiMasterStripeByClinicIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicId }: {
  clinicId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripeByClinicIdKeyFn({ clinicId }, queryKey), queryFn: () => StripeControllerService.getApiMasterStripeByClinicId({ clinicId }) as TData, ...options });
export const useStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidSuspense = <TData = Common.StripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  page?: number;
  patientClinicUuid: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidKeyFn({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }, queryKey), queryFn: () => StripeControllerService.getApiMasterStripePaymentMethodByPatientClinicUuid({ active, archive, page, patientClinicUuid, size, sortBy, sortDirection }) as TData, ...options });
export const useSpecialityControllerServiceGetApiMasterSpecialitySuspense = <TData = Common.SpecialityControllerServiceGetApiMasterSpecialityDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, size, sortBy, sortDirection }: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityKeyFn({ page, size, sortBy, sortDirection }, queryKey), queryFn: () => SpecialityControllerService.getApiMasterSpeciality({ page, size, sortBy, sortDirection }) as TData, ...options });
export const useSpecialityControllerServiceGetApiMasterSpecialityAllSuspense = <TData = Common.SpecialityControllerServiceGetApiMasterSpecialityAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityAllKeyFn(queryKey), queryFn: () => SpecialityControllerService.getApiMasterSpecialityAll() as TData, ...options });
export const useRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidSuspense = <TData = Common.RequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ uuid }: {
  uuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentByUuidKeyFn({ uuid }, queryKey), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentByUuid({ uuid }) as TData, ...options });
export const useRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllSuspense = <TData = Common.RequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  page?: number;
  patientUuid?: string;
  providerUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllKeyFn({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }, queryKey), queryFn: () => RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({ active, archive, clinicUuid, page, patientUuid, providerUuid, size, sortBy, sortDirection, status }) as TData, ...options });
export const useAvailabilityManagementServiceGetApiMasterSlotsSuspense = <TData = Common.AvailabilityManagementServiceGetApiMasterSlotsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }: {
  appointmentTypeUuid: string;
  availabilityMode?: "IN_PERSON" | "VIRTUAL" | "HOME";
  clinicUuid?: string;
  endDate?: string;
  locationUuid?: string;
  providerUuid: string;
  startDate?: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterSlotsKeyFn({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }, queryKey), queryFn: () => AvailabilityManagementService.getApiMasterSlots({ appointmentTypeUuid, availabilityMode, clinicUuid, endDate, locationUuid, providerUuid, startDate }) as TData, ...options });
export const useAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingSuspense = <TData = Common.AvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ providerUuid }: {
  providerUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAvailabilityManagementServiceGetApiMasterProviderByProviderUuidAvailabilitySettingKeyFn({ providerUuid }, queryKey), queryFn: () => AvailabilityManagementService.getApiMasterProviderByProviderUuidAvailabilitySetting({ providerUuid }) as TData, ...options });
export const usePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologySuspense = <TData = Common.PharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size, sortBy, sortDirection, type }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "LAB" | "PHARMACY" | "RADIOLOGY";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyKeyFn({ page, searchString, size, sortBy, sortDirection, type }, queryKey), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiology({ page, searchString, size, sortBy, sortDirection, type }) as TData, ...options });
export const usePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidSuspense = <TData = Common.PharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ preferenceUuid }: {
  preferenceUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyByPreferenceUuidKeyFn({ preferenceUuid }, queryKey), queryFn: () => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiologyByPreferenceUuid({ preferenceUuid }) as TData, ...options });
export const useMigrationControllerServiceGetApiMasterDataImportSuspense = <TData = Common.MigrationControllerServiceGetApiMasterDataImportDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, page, size, sortBy, sortDirection, type }: {
  clinicUuid?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportKeyFn({ clinicUuid, page, size, sortBy, sortDirection, type }, queryKey), queryFn: () => MigrationControllerService.getApiMasterDataImport({ clinicUuid, page, size, sortBy, sortDirection, type }) as TData, ...options });
export const useMigrationControllerServiceGetApiMasterDataImportSampleByCategorySuspense = <TData = Common.MigrationControllerServiceGetApiMasterDataImportSampleByCategoryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ category }: {
  category: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportSampleByCategoryKeyFn({ category }, queryKey), queryFn: () => MigrationControllerService.getApiMasterDataImportSampleByCategory({ category }) as TData, ...options });
export const useVideoControllerServiceGetApiMasterVideoTokenByRoomSuspense = <TData = Common.VideoControllerServiceGetApiMasterVideoTokenByRoomDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ authorization, room }: {
  authorization?: string;
  room: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseVideoControllerServiceGetApiMasterVideoTokenByRoomKeyFn({ authorization, room }, queryKey), queryFn: () => VideoControllerService.getApiMasterVideoTokenByRoom({ authorization, room }) as TData, ...options });
export const useVaccinesControllerServiceGetApiMasterVaccineSuspense = <TData = Common.VaccinesControllerServiceGetApiMasterVaccineDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseVaccinesControllerServiceGetApiMasterVaccineKeyFn({ page, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => VaccinesControllerService.getApiMasterVaccine({ page, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const useLicenseStateControllerServiceGetApiMasterStateListSuspense = <TData = Common.LicenseStateControllerServiceGetApiMasterStateListDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size }: {
  page?: number;
  searchString?: string;
  size?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLicenseStateControllerServiceGetApiMasterStateListKeyFn({ page, searchString, size }, queryKey), queryFn: () => LicenseStateControllerService.getApiMasterStateList({ page, searchString, size }) as TData, ...options });
export const useInsurancePayerControllerServiceGetApiMasterInsurancePayersSuspense = <TData = Common.InsurancePayerControllerServiceGetApiMasterInsurancePayersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, searchString, size, sortBy, sortDirection }: {
  page?: number;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseInsurancePayerControllerServiceGetApiMasterInsurancePayersKeyFn({ page, searchString, size, sortBy, sortDirection }, queryKey), queryFn: () => InsurancePayerControllerService.getApiMasterInsurancePayers({ page, searchString, size, sortBy, sortDirection }) as TData, ...options });
export const useAllergyControllerServiceGetApiMasterAllergySuspense = <TData = Common.AllergyControllerServiceGetApiMasterAllergyDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ page, size, sort, sortBy }: {
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAllergyControllerServiceGetApiMasterAllergyKeyFn({ page, size, sort, sortBy }, queryKey), queryFn: () => AllergyControllerService.getApiMasterAllergy({ page, size, sort, sortBy }) as TData, ...options });
