/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Brands = "brands",
	CampaignInvites = "campaign_invites",
	Campaigns = "campaigns",
	Creators = "creators",
	Submissions = "submissions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type BrandsRecord = {
	created: IsoAutoDateString
	description: HTMLString
	id: string
	is_verified?: boolean
	name: string
	updated: IsoAutoDateString
	user?: RecordIdString
}

export enum CampaignInvitesStatusOptions {
	"pending" = "pending",
	"accepted" = "accepted",
	"rejected" = "rejected",
}
export type CampaignInvitesRecord = {
	campaign?: RecordIdString
	created: IsoAutoDateString
	creator?: RecordIdString
	id: string
	status?: CampaignInvitesStatusOptions
	updated: IsoAutoDateString
}

export enum CampaignsGenderOptions {
	"M" = "M",
	"F" = "F",
	"B" = "B",
}

export enum CampaignsVisibilityOptions {
	"open" = "open",
	"private" = "private",
}

export enum CampaignsStatusOptions {
	"draft" = "draft",
	"active" = "active",
	"paused" = "paused",
	"completed" = "completed",
}
export type CampaignsRecord<Tage_ranges = unknown, Tplatform_payouts = unknown, Ttop_videos = unknown> = {
	age_ranges: null | Tage_ranges
	brand?: RecordIdString
	budget: number
	category: string
	country: number
	cpm: number
	created: IsoAutoDateString
	description: HTMLString
	end_date?: IsoDateString
	gender: CampaignsGenderOptions
	id: string
	launch_date: IsoDateString
	min_followers?: number
	platform_payouts?: null | Tplatform_payouts
	product_type: string
	requirements?: HTMLString
	status: CampaignsStatusOptions
	title: string
	top_videos?: null | Ttop_videos
	updated: IsoAutoDateString
	user?: RecordIdString
	visibility: CampaignsVisibilityOptions
}

export type CreatorsRecord<Tcontent_gallery = unknown, Tinterests = unknown, Tstats = unknown> = {
	avatar?: string
	bio?: HTMLString
	content_gallery?: null | Tcontent_gallery
	country: number
	created: IsoAutoDateString
	id: string
	interests?: null | Tinterests
	name: string
	rank?: string
	stats?: null | Tstats
	updated: IsoAutoDateString
	user_id?: RecordIdString
}

export enum SubmissionsStatusOptions {
	"pending" = "pending",
	"approved" = "approved",
	"rejected" = "rejected",
}
export type SubmissionsRecord = {
	brand?: RecordIdString
	campaign?: RecordIdString
	content_link?: string
	created: IsoAutoDateString
	creator?: RecordIdString
	id: string
	payout?: number
	reach?: number
	status?: SubmissionsStatusOptions
	updated: IsoAutoDateString
}

export enum UsersRoleOptions {
	"creator" = "creator",
	"brand" = "brand",
}
export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	last_otp_request?: IsoDateString
	name?: string
	password: string
	role: UsersRoleOptions
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type BrandsResponse<Texpand = unknown> = Required<BrandsRecord> & BaseSystemFields<Texpand>
export type CampaignInvitesResponse<Texpand = unknown> = Required<CampaignInvitesRecord> & BaseSystemFields<Texpand>
export type CampaignsResponse<Tage_ranges = unknown, Tplatform_payouts = unknown, Ttop_videos = unknown, Texpand = unknown> = Required<CampaignsRecord<Tage_ranges, Tplatform_payouts, Ttop_videos>> & BaseSystemFields<Texpand>
export type CreatorsResponse<Tcontent_gallery = unknown, Tinterests = unknown, Tstats = unknown, Texpand = unknown> = Required<CreatorsRecord<Tcontent_gallery, Tinterests, Tstats>> & BaseSystemFields<Texpand>
export type SubmissionsResponse<Texpand = unknown> = Required<SubmissionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	brands: BrandsRecord
	campaign_invites: CampaignInvitesRecord
	campaigns: CampaignsRecord
	creators: CreatorsRecord
	submissions: SubmissionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	brands: BrandsResponse
	campaign_invites: CampaignInvitesResponse
	campaigns: CampaignsResponse
	creators: CreatorsResponse
	submissions: SubmissionsResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
