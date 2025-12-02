// generated with @7nohe/openapi-react-query-codegen@1.6.2 
import { InfiniteData, UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { AllergyControllerService, AppointmentManagementService, AppointmentTypeManagementService, ClinicControllerService, ClinicalTemplateService, DocumentTypeControllerService, FeeScheduleControllerService, InsurancePayerControllerService, IntakeFormConsentTemplateService, LicenseStateControllerService, LocationControllerService, MedicalCodeControllerService, MigrationControllerService, PatientAllergyControllerService, PatientClinicControllerService, PatientControllerService, PatientDiagnosisControllerService, PatientDocumentControllerService, PatientFamilyHistoryControllerService, PatientFlagControllerService, PatientInsuranceControllerService, PatientMedicalHistoryControllerService, PatientSurgicalHistoryControllerService, PatientVaccineControllerService, PharmacyLabRadiologyControllerService, ProviderControllerService, RequestAppointmentManagementService, SpecialityControllerService, StickyNoteControllerService, StripeControllerService, TextMacroControllerService, UserControllerService, VaccinesControllerService, VisitNoteTemplateService } from "../requests/services.gen";
import * as Common from "./common";
export const useUserControllerServiceGetApiMasterUsersInfinite = <TData = InfiniteData<Common.UserControllerServiceGetApiMasterUsersDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseUserControllerServiceGetApiMasterUsersKeyFn({ archive, clinicId, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: ({ pageParam }) => UserControllerService.getApiMasterUsers({ archive, clinicId, page: pageParam as number, searchString, size, sortBy, sortDirection, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateInfinite = <TData = InfiniteData<Common.VisitNoteTemplateServiceGetApiMasterVisitNoteTemplateDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, clinicUuid, size, sortBy, sortDirection, templateName, templateType }: {
  active?: boolean;
  clinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseVisitNoteTemplateServiceGetApiMasterVisitNoteTemplateKeyFn({ active, clinicUuid, size, sortBy, sortDirection, templateName, templateType }, queryKey), queryFn: ({ pageParam }) => VisitNoteTemplateService.getApiMasterVisitNoteTemplate({ active, clinicUuid, page: pageParam as number, size, sortBy, sortDirection, templateName, templateType }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useTextMacroControllerServiceGetApiMasterTextMacroInfinite = <TData = InfiniteData<Common.TextMacroControllerServiceGetApiMasterTextMacroDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, size, sortBy, sortDirection, title }: {
  clinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseTextMacroControllerServiceGetApiMasterTextMacroKeyFn({ clinicUuid, size, sortBy, sortDirection, title }, queryKey), queryFn: ({ pageParam }) => TextMacroControllerService.getApiMasterTextMacro({ clinicUuid, page: pageParam as number, size, sortBy, sortDirection, title }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useStickyNoteControllerServiceGetApiMasterStickyNotesInfinite = <TData = InfiniteData<Common.StickyNoteControllerServiceGetApiMasterStickyNotesDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, patientClinicUuid, size, sort, sortBy, status }: {
  archive?: boolean;
  patientClinicUuid: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseStickyNoteControllerServiceGetApiMasterStickyNotesKeyFn({ archive, patientClinicUuid, size, sort, sortBy, status }, queryKey), queryFn: ({ pageParam }) => StickyNoteControllerService.getApiMasterStickyNotes({ archive, page: pageParam as number, patientClinicUuid, size, sort, sortBy, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useProviderControllerServiceGetApiMasterProviderInfinite = <TData = InfiniteData<Common.ProviderControllerServiceGetApiMasterProviderDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicId?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseProviderControllerServiceGetApiMasterProviderKeyFn({ archive, clinicId, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: ({ pageParam }) => ProviderControllerService.getApiMasterProvider({ archive, clinicId, page: pageParam as number, searchString, size, sortBy, sortDirection, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientControllerServiceGetApiMasterPatientInfinite = <TData = InfiniteData<Common.PatientControllerServiceGetApiMasterPatientDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientControllerServiceGetApiMasterPatientKeyFn({ archive, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: ({ pageParam }) => PatientControllerService.getApiMasterPatient({ archive, page: pageParam as number, searchString, size, sortBy, sortDirection, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientVaccineControllerServiceGetApiMasterPatientVaccineInfinite = <TData = InfiniteData<Common.PatientVaccineControllerServiceGetApiMasterPatientVaccineDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientVaccineControllerServiceGetApiMasterPatientVaccineKeyFn({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: ({ pageParam }) => PatientVaccineControllerService.getApiMasterPatientVaccine({ archive, page: pageParam as number, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryInfinite = <TData = InfiniteData<Common.PatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientSurgicalHistoryControllerServiceGetApiMasterPatientSurgicalHistoryKeyFn({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: ({ pageParam }) => PatientSurgicalHistoryControllerService.getApiMasterPatientSurgicalHistory({ archive, page: pageParam as number, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryInfinite = <TData = InfiniteData<Common.PatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientMedicalHistoryControllerServiceGetApiMasterPatientMedicalHistoryKeyFn({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: ({ pageParam }) => PatientMedicalHistoryControllerService.getApiMasterPatientMedicalHistory({ archive, page: pageParam as number, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientInsuranceControllerServiceGetApiMasterPatientInsuranceInfinite = <TData = InfiniteData<Common.PatientInsuranceControllerServiceGetApiMasterPatientInsuranceDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, insuranceType, patientClinicUuid, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  insuranceType?: "PRIMARY" | "SECONDARY" | "TERTIARY" | "OTHER";
  patientClinicUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientInsuranceControllerServiceGetApiMasterPatientInsuranceKeyFn({ active, archive, clinicUuid, insuranceType, patientClinicUuid, searchString, size, sortBy, sortDirection }, queryKey), queryFn: ({ pageParam }) => PatientInsuranceControllerService.getApiMasterPatientInsurance({ active, archive, clinicUuid, insuranceType, page: pageParam as number, patientClinicUuid, searchString, size, sortBy, sortDirection }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientFlagControllerServiceGetApiMasterPatientFlagInfinite = <TData = InfiniteData<Common.PatientFlagControllerServiceGetApiMasterPatientFlagDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicUuid, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  clinicUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientFlagControllerServiceGetApiMasterPatientFlagKeyFn({ archive, clinicUuid, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: ({ pageParam }) => PatientFlagControllerService.getApiMasterPatientFlag({ archive, clinicUuid, page: pageParam as number, searchString, size, sortBy, sortDirection, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryInfinite = <TData = InfiniteData<Common.PatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientFamilyHistoryControllerServiceGetApiMasterPatientFamilyHistoryKeyFn({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: ({ pageParam }) => PatientFamilyHistoryControllerService.getApiMasterPatientFamilyHistory({ archive, page: pageParam as number, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientDocumentControllerServiceGetApiMasterPatientDocumentListInfinite = <TData = InfiniteData<Common.PatientDocumentControllerServiceGetApiMasterPatientDocumentListDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, assigned, patientId, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  assigned?: boolean;
  patientId?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientDocumentControllerServiceGetApiMasterPatientDocumentListKeyFn({ archive, assigned, patientId, size, sortBy, sortDirection, status }, queryKey), queryFn: ({ pageParam }) => PatientDocumentControllerService.getApiMasterPatientDocumentList({ archive, assigned, page: pageParam as number, patientId, size, sortBy, sortDirection, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisInfinite = <TData = InfiniteData<Common.PatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, patientClinicUuid, searchString, size, sortBy, sortDirection, status }: {
  archive?: boolean;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientDiagnosisControllerServiceGetApiMasterPatientDiagnosisKeyFn({ archive, patientClinicUuid, searchString, size, sortBy, sortDirection, status }, queryKey), queryFn: ({ pageParam }) => PatientDiagnosisControllerService.getApiMasterPatientDiagnosis({ archive, page: pageParam as number, patientClinicUuid, searchString, size, sortBy, sortDirection, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientClinicControllerServiceGetApiMasterPatientClinicInfinite = <TData = InfiniteData<Common.PatientClinicControllerServiceGetApiMasterPatientClinicDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  patientUuid?: string;
  primaryProviderUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientClinicControllerServiceGetApiMasterPatientClinicKeyFn({ active, archive, clinicUuid, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }, queryKey), queryFn: ({ pageParam }) => PatientClinicControllerService.getApiMasterPatientClinic({ active, archive, clinicUuid, page: pageParam as number, patientUuid, primaryProviderUuid, searchString, size, sortBy, sortDirection }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePatientAllergyControllerServiceGetApiMasterPatientAllergyInfinite = <TData = InfiniteData<Common.PatientAllergyControllerServiceGetApiMasterPatientAllergyDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }: {
  archive?: boolean;
  patientClinicUuid: string;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  status?: boolean;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePatientAllergyControllerServiceGetApiMasterPatientAllergyKeyFn({ archive, patientClinicUuid, searchString, size, sort, sortBy, status }, queryKey), queryFn: ({ pageParam }) => PatientAllergyControllerService.getApiMasterPatientAllergy({ archive, page: pageParam as number, patientClinicUuid, searchString, size, sort, sortBy, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useMedicalCodeControllerServiceGetApiMasterMedicalCodesInfinite = <TData = InfiniteData<Common.MedicalCodeControllerServiceGetApiMasterMedicalCodesDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, searchString, size, sort, sortBy, type }: {
  active?: boolean;
  archive?: boolean;
  searchString?: string;
  size?: number;
  sort?: string;
  sortBy?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseMedicalCodeControllerServiceGetApiMasterMedicalCodesKeyFn({ active, archive, searchString, size, sort, sortBy, type }, queryKey), queryFn: ({ pageParam }) => MedicalCodeControllerService.getApiMasterMedicalCodes({ active, archive, page: pageParam as number, searchString, size, sort, sortBy, type }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useLocationControllerServiceGetApiMasterLocationInfinite = <TData = InfiniteData<Common.LocationControllerServiceGetApiMasterLocationDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseLocationControllerServiceGetApiMasterLocationKeyFn({ archive, clinicId, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: ({ pageParam }) => LocationControllerService.getApiMasterLocation({ archive, clinicId, page: pageParam as number, searchString, size, sortBy, sortDirection, state, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useLocationControllerServiceGetApiMasterLocationV2Infinite = <TData = InfiniteData<Common.LocationControllerServiceGetApiMasterLocationV2DefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, clinicId, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  clinicId?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseLocationControllerServiceGetApiMasterLocationV2KeyFn({ archive, clinicId, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: ({ pageParam }) => LocationControllerService.getApiMasterLocationV2({ archive, clinicId, page: pageParam as number, searchString, size, sortBy, sortDirection, state, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllInfinite = <TData = InfiniteData<Common.IntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, formType, patientClinicUuid, size, sortBy, sortDirection, templateName }: {
  active?: boolean;
  formType?: "CONSENT_FORM" | "INTAKE_FORM";
  patientClinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateName?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseIntakeFormConsentTemplateServiceGetApiMasterIntakeFormConsentTemplateAllKeyFn({ active, formType, patientClinicUuid, size, sortBy, sortDirection, templateName }, queryKey), queryFn: ({ pageParam }) => IntakeFormConsentTemplateService.getApiMasterIntakeFormConsentTemplateAll({ active, formType, page: pageParam as number, patientClinicUuid, size, sortBy, sortDirection, templateName }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useFeeScheduleControllerServiceGetApiMasterFeeScheduleInfinite = <TData = InfiniteData<Common.FeeScheduleControllerServiceGetApiMasterFeeScheduleDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, searchString, size }: {
  active?: boolean;
  archive?: boolean;
  searchString?: string;
  size?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseFeeScheduleControllerServiceGetApiMasterFeeScheduleKeyFn({ active, archive, searchString, size }, queryKey), queryFn: ({ pageParam }) => FeeScheduleControllerService.getApiMasterFeeSchedule({ active, archive, page: pageParam as number, searchString, size }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useDocumentTypeControllerServiceGetApiMasterDocumentTypeInfinite = <TData = InfiniteData<Common.DocumentTypeControllerServiceGetApiMasterDocumentTypeDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, searchString, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseDocumentTypeControllerServiceGetApiMasterDocumentTypeKeyFn({ active, archive, clinicUuid, searchString, size, sortBy, sortDirection }, queryKey), queryFn: ({ pageParam }) => DocumentTypeControllerService.getApiMasterDocumentType({ active, archive, clinicUuid, page: pageParam as number, searchString, size, sortBy, sortDirection }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useClinicalTemplateServiceGetApiMasterClinicalTemplateInfinite = <TData = InfiniteData<Common.ClinicalTemplateServiceGetApiMasterClinicalTemplateDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, clinicUuid, size, sortBy, sortDirection, templateType, title }: {
  active?: boolean;
  clinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  templateType?: "ROS" | "PE" | "SOAP_NOTE" | "SIMPLE_NOTE" | "CONSULTATION_NOTE";
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseClinicalTemplateServiceGetApiMasterClinicalTemplateKeyFn({ active, clinicUuid, size, sortBy, sortDirection, templateType, title }, queryKey), queryFn: ({ pageParam }) => ClinicalTemplateService.getApiMasterClinicalTemplate({ active, clinicUuid, page: pageParam as number, size, sortBy, sortDirection, templateType, title }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useClinicControllerServiceGetApiMasterClinicInfinite = <TData = InfiniteData<Common.ClinicControllerServiceGetApiMasterClinicDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ archive, searchString, size, sortBy, sortDirection, state, status }: {
  archive?: boolean;
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  state?: string;
  status?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseClinicControllerServiceGetApiMasterClinicKeyFn({ archive, searchString, size, sortBy, sortDirection, state, status }, queryKey), queryFn: ({ pageParam }) => ClinicControllerService.getApiMasterClinic({ archive, page: pageParam as number, searchString, size, sortBy, sortDirection, state, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useAppointmentManagementServiceGetApiMasterAppointmentsInfinite = <TData = InfiniteData<Common.AppointmentManagementServiceGetApiMasterAppointmentsDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }: {
  active?: boolean;
  appointmentModes?: string;
  appointmentStatuses?: string;
  appointmentTypes?: string;
  archive?: boolean;
  clinicUuid?: string;
  endDate?: string;
  locationUuid?: string[];
  patientUuid?: string;
  providerUuid?: string[];
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  startDate?: string;
  timeFilter?: "ALL" | "UPCOMING" | "PAST";
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseAppointmentManagementServiceGetApiMasterAppointmentsKeyFn({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }, queryKey), queryFn: ({ pageParam }) => AppointmentManagementService.getApiMasterAppointments({ active, appointmentModes, appointmentStatuses, appointmentTypes, archive, clinicUuid, endDate, locationUuid, page: pageParam as number, patientUuid, providerUuid, searchString, size, sortBy, sortDirection, startDate, timeFilter }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useAppointmentTypeManagementServiceGetApiMasterAppointmentTypesInfinite = <TData = InfiniteData<Common.AppointmentTypeManagementServiceGetApiMasterAppointmentTypesDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ size, title }: {
  size?: number;
  title?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseAppointmentTypeManagementServiceGetApiMasterAppointmentTypesKeyFn({ size, title }, queryKey), queryFn: ({ pageParam }) => AppointmentTypeManagementService.getApiMasterAppointmentTypes({ page: pageParam as number, size, title }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidInfinite = <TData = InfiniteData<Common.StripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, patientClinicUuid, size, sortBy, sortDirection }: {
  active?: boolean;
  archive?: boolean;
  patientClinicUuid: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseStripeControllerServiceGetApiMasterStripePaymentMethodByPatientClinicUuidKeyFn({ active, archive, patientClinicUuid, size, sortBy, sortDirection }, queryKey), queryFn: ({ pageParam }) => StripeControllerService.getApiMasterStripePaymentMethodByPatientClinicUuid({ active, archive, page: pageParam as number, patientClinicUuid, size, sortBy, sortDirection }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useSpecialityControllerServiceGetApiMasterSpecialityInfinite = <TData = InfiniteData<Common.SpecialityControllerServiceGetApiMasterSpecialityDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ size, sortBy, sortDirection }: {
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseSpecialityControllerServiceGetApiMasterSpecialityKeyFn({ size, sortBy, sortDirection }, queryKey), queryFn: ({ pageParam }) => SpecialityControllerService.getApiMasterSpeciality({ page: pageParam as number, size, sortBy, sortDirection }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllInfinite = <TData = InfiniteData<Common.RequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ active, archive, clinicUuid, patientUuid, providerUuid, size, sortBy, sortDirection, status }: {
  active?: boolean;
  archive?: boolean;
  clinicUuid?: string;
  patientUuid?: string;
  providerUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseRequestAppointmentManagementServiceGetApiMasterRequestAppointmentAllKeyFn({ active, archive, clinicUuid, patientUuid, providerUuid, size, sortBy, sortDirection, status }, queryKey), queryFn: ({ pageParam }) => RequestAppointmentManagementService.getApiMasterRequestAppointmentAll({ active, archive, clinicUuid, page: pageParam as number, patientUuid, providerUuid, size, sortBy, sortDirection, status }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const usePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyInfinite = <TData = InfiniteData<Common.PharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ searchString, size, sortBy, sortDirection, type }: {
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "LAB" | "PHARMACY" | "RADIOLOGY";
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UsePharmacyLabRadiologyControllerServiceGetApiMasterPharmacyLabRadiologyKeyFn({ searchString, size, sortBy, sortDirection, type }, queryKey), queryFn: ({ pageParam }) => PharmacyLabRadiologyControllerService.getApiMasterPharmacyLabRadiology({ page: pageParam as number, searchString, size, sortBy, sortDirection, type }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useMigrationControllerServiceGetApiMasterDataImportInfinite = <TData = InfiniteData<Common.MigrationControllerServiceGetApiMasterDataImportDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ clinicUuid, size, sortBy, sortDirection, type }: {
  clinicUuid?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  type?: "CPT" | "ICD" | "CUSTOM" | "HCPCS" | "LOINC" | "PAYER_CATALOG" | "PATIENT" | "PROVIDER";
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseMigrationControllerServiceGetApiMasterDataImportKeyFn({ clinicUuid, size, sortBy, sortDirection, type }, queryKey), queryFn: ({ pageParam }) => MigrationControllerService.getApiMasterDataImport({ clinicUuid, page: pageParam as number, size, sortBy, sortDirection, type }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useVaccinesControllerServiceGetApiMasterVaccineInfinite = <TData = InfiniteData<Common.VaccinesControllerServiceGetApiMasterVaccineDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ searchString, size, sortBy, sortDirection }: {
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseVaccinesControllerServiceGetApiMasterVaccineKeyFn({ searchString, size, sortBy, sortDirection }, queryKey), queryFn: ({ pageParam }) => VaccinesControllerService.getApiMasterVaccine({ page: pageParam as number, searchString, size, sortBy, sortDirection }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useLicenseStateControllerServiceGetApiMasterStateListInfinite = <TData = InfiniteData<Common.LicenseStateControllerServiceGetApiMasterStateListDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ searchString, size }: {
  searchString?: string;
  size?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseLicenseStateControllerServiceGetApiMasterStateListKeyFn({ searchString, size }, queryKey), queryFn: ({ pageParam }) => LicenseStateControllerService.getApiMasterStateList({ page: pageParam as number, searchString, size }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useInsurancePayerControllerServiceGetApiMasterInsurancePayersInfinite = <TData = InfiniteData<Common.InsurancePayerControllerServiceGetApiMasterInsurancePayersDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ searchString, size, sortBy, sortDirection }: {
  searchString?: string;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseInsurancePayerControllerServiceGetApiMasterInsurancePayersKeyFn({ searchString, size, sortBy, sortDirection }, queryKey), queryFn: ({ pageParam }) => InsurancePayerControllerService.getApiMasterInsurancePayers({ page: pageParam as number, searchString, size, sortBy, sortDirection }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
export const useAllergyControllerServiceGetApiMasterAllergyInfinite = <TData = InfiniteData<Common.AllergyControllerServiceGetApiMasterAllergyDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ size, sort, sortBy }: {
  size?: number;
  sort?: string;
  sortBy?: string;
} = {}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseAllergyControllerServiceGetApiMasterAllergyKeyFn({ size, sort, sortBy }, queryKey), queryFn: ({ pageParam }) => AllergyControllerService.getApiMasterAllergy({ page: pageParam as number, size, sort, sortBy }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    nextPage: string;
  }).nextPage, ...options
});
