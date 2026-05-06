-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ADVISOR');

-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('NATURAL_PERSON', 'LEGAL_ENTITY');

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('SALE', 'RENT');

-- CreateEnum
CREATE TYPE "OfferState" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'FINALIZATION_REQUESTED', 'FINALIZED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RentFrequency" AS ENUM ('MONTHLY');

-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('RECEIVED', 'ASSIGNED', 'ATTENDED', 'DISCARDED');

-- CreateEnum
CREATE TYPE "ContactReceivedChannel" AS ENUM ('CATALOG_PUBLIC', 'WHATSAPP_INTAKE', 'PHONE_INTAKE');

-- CreateEnum
CREATE TYPE "PublicationRequestStatus" AS ENUM ('PENDING_REVIEW', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "PublicationRequestOfferType" AS ENUM ('SALE', 'RENT', 'BOTH');

-- CreateEnum
CREATE TYPE "PersonalDataSubjectType" AS ENUM ('PUBLICATION_REQUEST', 'PROPERTY_OWNER');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'SMS', 'PUSH', 'IN_APP');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationOutboxStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "AuditActorType" AS ENUM ('USER', 'SYSTEM', 'ANONYMOUS');

-- CreateEnum
CREATE TYPE "AuditSubjectType" AS ENUM ('PUBLICATION_REQUEST', 'PROPERTY', 'PROPERTY_OFFER', 'PROPERTY_OWNER', 'USER_PROFILE', 'CONTACT_MESSAGE');

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "phone" VARCHAR(50),
    "role" "UserRole" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_types" (
    "id" UUID NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "property_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_subtypes" (
    "id" UUID NOT NULL,
    "property_type_id" UUID NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "property_subtypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_uses" (
    "id" UUID NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "property_uses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_conditions" (
    "id" UUID NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "property_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zone_types" (
    "id" UUID NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "zone_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" UUID NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenities" (
    "id" UUID NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL,
    "internal_code" VARCHAR(20) NOT NULL,
    "property_type_id" UUID NOT NULL,
    "property_subtype_id" UUID NOT NULL,
    "property_use_id" UUID NOT NULL,
    "zone_type_id" UUID NOT NULL,
    "property_condition_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" TEXT NOT NULL,
    "internal_notes" TEXT,
    "registration_number" VARCHAR(60),
    "deeds_date" DATE,
    "country" VARCHAR(80) NOT NULL DEFAULT 'Colombia',
    "department" VARCHAR(80) NOT NULL,
    "city" VARCHAR(80) NOT NULL,
    "neighborhood" VARCHAR(120),
    "sector" VARCHAR(120),
    "address_private" VARCHAR(200) NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "land_area_m2" DECIMAL(10,2),
    "built_area_m2" DECIMAL(10,2),
    "private_area_m2" DECIMAL(10,2),
    "available_area_m2" DECIMAL(10,2),
    "rooms" INTEGER,
    "bathrooms" INTEGER,
    "parking_spaces" INTEGER,
    "floors" INTEGER,
    "floor_number" INTEGER,
    "year_built" INTEGER,
    "stratum" INTEGER,
    "furnished" BOOLEAN DEFAULT false,
    "free_of_liens" BOOLEAN DEFAULT true,
    "property_tax_annual" DECIMAL(15,2),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_owners" (
    "id" UUID NOT NULL,
    "owner_type" "OwnerType" NOT NULL,
    "full_name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "phone_primary" VARCHAR(50) NOT NULL,
    "phone_secondary" VARCHAR(50),
    "document_type" VARCHAR(20),
    "document_number" VARCHAR(40),
    "legal_name" VARCHAR(200),
    "tax_id" VARCHAR(40),
    "legal_rep_name" VARCHAR(200),
    "publication_request_id" UUID,
    "internal_notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "property_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_images" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "public_id" VARCHAR(200) NOT NULL,
    "position" INTEGER NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_features" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "feature_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_amenities" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "amenity_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_valuations" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "land_valuation_m2" DECIMAL(15,2),
    "construction_valuation_m2" DECIMAL(15,2),
    "cadastral_valuation" DECIMAL(15,2) NOT NULL,
    "valuation_date" DATE NOT NULL,
    "valuation_notes" TEXT,
    "valuation_status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "property_valuations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_advisor_assignments" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "advisor_id" UUID NOT NULL,
    "assigned_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unassigned_at" TIMESTAMPTZ(6),
    "reason" TEXT,

    CONSTRAINT "property_advisor_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_offers" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "offer_type" "OfferType" NOT NULL,
    "state" "OfferState" NOT NULL DEFAULT 'DRAFT',
    "sale_price" DECIMAL(15,2),
    "sale_negotiable" BOOLEAN,
    "rent_price" DECIMAL(15,2),
    "rent_frequency" "RentFrequency",
    "includes_administration" BOOLEAN,
    "administration_fee" DECIMAL(15,2),
    "minimum_term_months" INTEGER,
    "deposit_required" BOOLEAN,
    "published_at" TIMESTAMPTZ(6),
    "closed_at" TIMESTAMPTZ(6),
    "closure_reason" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "property_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_state_transitions" (
    "id" UUID NOT NULL,
    "offer_id" UUID NOT NULL,
    "from_state" "OfferState" NOT NULL,
    "to_state" "OfferState" NOT NULL,
    "performed_by" UUID NOT NULL,
    "motive" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offer_state_transitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "message" VARCHAR(2000) NOT NULL,
    "property_id" UUID,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'RECEIVED',
    "received_channel" "ContactReceivedChannel" NOT NULL DEFAULT 'CATALOG_PUBLIC',
    "assigned_advisor_id" UUID,
    "attended_at" TIMESTAMPTZ(6),
    "dedup_hash" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_message_notes" (
    "id" UUID NOT NULL,
    "message_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_message_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication_requests" (
    "id" UUID NOT NULL,
    "reference_number" VARCHAR(20) NOT NULL,
    "owner_full_name" VARCHAR(200) NOT NULL,
    "owner_email" VARCHAR(180) NOT NULL,
    "owner_phone_primary" VARCHAR(50) NOT NULL,
    "owner_phone_secondary" VARCHAR(50),
    "owner_document_type" VARCHAR(20),
    "owner_document_number" VARCHAR(40),
    "proposed_property_type_id" UUID,
    "proposed_offer_type" "PublicationRequestOfferType" NOT NULL,
    "proposed_location" VARCHAR(300) NOT NULL,
    "proposed_area_m2" DECIMAL(10,2),
    "proposed_description" TEXT NOT NULL,
    "proposed_expected_price" DECIMAL(15,2),
    "status" "PublicationRequestStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "assigned_advisor_id" UUID,
    "decision_at" TIMESTAMPTZ(6),
    "decision_by_admin_id" UUID,
    "decision_motive" TEXT,
    "captcha_token" VARCHAR(2048) NOT NULL,
    "submitted_from_ip" VARCHAR(45),
    "submitted_from_user_agent" VARCHAR(500),
    "dedup_hash" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "publication_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personal_data_authorizations" (
    "id" UUID NOT NULL,
    "subject_type" "PersonalDataSubjectType" NOT NULL,
    "subject_id" UUID NOT NULL,
    "titular_full_name" VARCHAR(200) NOT NULL,
    "titular_document_type" VARCHAR(20) NOT NULL,
    "titular_document_number" VARCHAR(40) NOT NULL,
    "authorized_purposes" TEXT NOT NULL,
    "privacy_notice_version" VARCHAR(20) NOT NULL,
    "consent_ip" VARCHAR(45),
    "consent_user_agent" VARCHAR(500),
    "consented_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    "revoked_at" TIMESTAMPTZ(6),
    "revocation_reason" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personal_data_authorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_outbox" (
    "id" UUID NOT NULL,
    "template_code" VARCHAR(80) NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "recipient" VARCHAR(300) NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "NotificationOutboxStatus" NOT NULL DEFAULT 'PENDING',
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "last_attempt_at" TIMESTAMPTZ(6),
    "last_error_message" TEXT,
    "notification_log_id" UUID,
    "scheduled_for" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "notification_outbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_log" (
    "id" UUID NOT NULL,
    "template_code" VARCHAR(80) NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "recipient" VARCHAR(300) NOT NULL,
    "status" "NotificationStatus" NOT NULL,
    "provider_message_id" VARCHAR(200),
    "error_message" TEXT,
    "metadata" JSONB,
    "sent_at" TIMESTAMPTZ(6),
    "delivered_at" TIMESTAMPTZ(6),
    "failed_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" UUID NOT NULL,
    "subject_type" "AuditSubjectType" NOT NULL,
    "subject_id" UUID NOT NULL,
    "action" VARCHAR(80) NOT NULL,
    "actor_type" "AuditActorType" NOT NULL,
    "actor_id" UUID,
    "description" TEXT,
    "metadata" JSONB,
    "request_ip" VARCHAR(45),
    "request_user_agent" VARCHAR(500),
    "correlation_id" VARCHAR(64),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "user_profiles"("email");

-- CreateIndex
CREATE INDEX "user_profiles_role_is_active_idx" ON "user_profiles"("role", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "property_types_code_key" ON "property_types"("code");

-- CreateIndex
CREATE INDEX "property_types_is_active_idx" ON "property_types"("is_active");

-- CreateIndex
CREATE INDEX "property_subtypes_property_type_id_is_active_idx" ON "property_subtypes"("property_type_id", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "property_subtypes_property_type_id_code_key" ON "property_subtypes"("property_type_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "property_uses_code_key" ON "property_uses"("code");

-- CreateIndex
CREATE INDEX "property_uses_is_active_idx" ON "property_uses"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "property_conditions_code_key" ON "property_conditions"("code");

-- CreateIndex
CREATE INDEX "property_conditions_is_active_idx" ON "property_conditions"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "zone_types_code_key" ON "zone_types"("code");

-- CreateIndex
CREATE INDEX "zone_types_is_active_idx" ON "zone_types"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "features_code_key" ON "features"("code");

-- CreateIndex
CREATE INDEX "features_is_active_idx" ON "features"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "amenities_code_key" ON "amenities"("code");

-- CreateIndex
CREATE INDEX "amenities_is_active_idx" ON "amenities"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "properties_internal_code_key" ON "properties"("internal_code");

-- CreateIndex
CREATE INDEX "properties_city_is_active_idx" ON "properties"("city", "is_active");

-- CreateIndex
CREATE INDEX "properties_property_type_id_is_active_idx" ON "properties"("property_type_id", "is_active");

-- CreateIndex
CREATE INDEX "properties_is_active_idx" ON "properties"("is_active");

-- CreateIndex
CREATE INDEX "properties_owner_id_idx" ON "properties"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_owners_publication_request_id_key" ON "property_owners"("publication_request_id");

-- CreateIndex
CREATE INDEX "property_owners_email_idx" ON "property_owners"("email");

-- CreateIndex
CREATE INDEX "property_owners_is_active_idx" ON "property_owners"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "property_owners_document_type_document_number_key" ON "property_owners"("document_type", "document_number");

-- CreateIndex
CREATE UNIQUE INDEX "property_owners_tax_id_key" ON "property_owners"("tax_id");

-- CreateIndex
CREATE INDEX "property_images_property_id_position_idx" ON "property_images"("property_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "property_features_property_id_feature_id_key" ON "property_features"("property_id", "feature_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_amenities_property_id_amenity_id_key" ON "property_amenities"("property_id", "amenity_id");

-- CreateIndex
CREATE INDEX "property_valuations_property_id_valuation_date_idx" ON "property_valuations"("property_id", "valuation_date");

-- CreateIndex
CREATE INDEX "property_advisor_assignments_property_id_unassigned_at_idx" ON "property_advisor_assignments"("property_id", "unassigned_at");

-- CreateIndex
CREATE INDEX "property_advisor_assignments_advisor_id_unassigned_at_idx" ON "property_advisor_assignments"("advisor_id", "unassigned_at");

-- CreateIndex
CREATE INDEX "property_offers_property_id_state_idx" ON "property_offers"("property_id", "state");

-- CreateIndex
CREATE INDEX "property_offers_state_published_at_idx" ON "property_offers"("state", "published_at");

-- CreateIndex
CREATE INDEX "property_offers_offer_type_state_idx" ON "property_offers"("offer_type", "state");

-- CreateIndex
CREATE INDEX "offer_state_transitions_offer_id_created_at_idx" ON "offer_state_transitions"("offer_id", "created_at");

-- CreateIndex
CREATE INDEX "offer_state_transitions_performed_by_idx" ON "offer_state_transitions"("performed_by");

-- CreateIndex
CREATE UNIQUE INDEX "contact_messages_dedup_hash_key" ON "contact_messages"("dedup_hash");

-- CreateIndex
CREATE INDEX "contact_messages_status_created_at_idx" ON "contact_messages"("status", "created_at");

-- CreateIndex
CREATE INDEX "contact_messages_assigned_advisor_id_status_idx" ON "contact_messages"("assigned_advisor_id", "status");

-- CreateIndex
CREATE INDEX "contact_messages_property_id_idx" ON "contact_messages"("property_id");

-- CreateIndex
CREATE INDEX "contact_message_notes_message_id_created_at_idx" ON "contact_message_notes"("message_id", "created_at");

-- CreateIndex
CREATE INDEX "contact_message_notes_author_id_idx" ON "contact_message_notes"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "publication_requests_reference_number_key" ON "publication_requests"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "publication_requests_dedup_hash_key" ON "publication_requests"("dedup_hash");

-- CreateIndex
CREATE INDEX "publication_requests_status_created_at_idx" ON "publication_requests"("status", "created_at");

-- CreateIndex
CREATE INDEX "publication_requests_assigned_advisor_id_status_idx" ON "publication_requests"("assigned_advisor_id", "status");

-- CreateIndex
CREATE INDEX "publication_requests_owner_email_idx" ON "publication_requests"("owner_email");

-- CreateIndex
CREATE INDEX "personal_data_authorizations_subject_type_subject_id_idx" ON "personal_data_authorizations"("subject_type", "subject_id");

-- CreateIndex
CREATE INDEX "personal_data_authorizations_titular_document_type_titular__idx" ON "personal_data_authorizations"("titular_document_type", "titular_document_number");

-- CreateIndex
CREATE UNIQUE INDEX "notification_outbox_notification_log_id_key" ON "notification_outbox"("notification_log_id");

-- CreateIndex
CREATE INDEX "notification_outbox_status_scheduled_for_idx" ON "notification_outbox"("status", "scheduled_for");

-- CreateIndex
CREATE INDEX "notification_outbox_status_created_at_idx" ON "notification_outbox"("status", "created_at");

-- CreateIndex
CREATE INDEX "notification_log_status_created_at_idx" ON "notification_log"("status", "created_at");

-- CreateIndex
CREATE INDEX "notification_log_recipient_created_at_idx" ON "notification_log"("recipient", "created_at");

-- CreateIndex
CREATE INDEX "notification_log_template_code_created_at_idx" ON "notification_log"("template_code", "created_at");

-- CreateIndex
CREATE INDEX "audit_log_subject_type_subject_id_created_at_idx" ON "audit_log"("subject_type", "subject_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_log_actor_id_created_at_idx" ON "audit_log"("actor_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_log_action_created_at_idx" ON "audit_log"("action", "created_at");

-- CreateIndex
CREATE INDEX "audit_log_created_at_idx" ON "audit_log"("created_at");

-- AddForeignKey
ALTER TABLE "property_subtypes" ADD CONSTRAINT "property_subtypes_property_type_id_fkey" FOREIGN KEY ("property_type_id") REFERENCES "property_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_property_type_id_fkey" FOREIGN KEY ("property_type_id") REFERENCES "property_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_property_subtype_id_fkey" FOREIGN KEY ("property_subtype_id") REFERENCES "property_subtypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_property_use_id_fkey" FOREIGN KEY ("property_use_id") REFERENCES "property_uses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_zone_type_id_fkey" FOREIGN KEY ("zone_type_id") REFERENCES "zone_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_property_condition_id_fkey" FOREIGN KEY ("property_condition_id") REFERENCES "property_conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "property_owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_features" ADD CONSTRAINT "property_features_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_features" ADD CONSTRAINT "property_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_valuations" ADD CONSTRAINT "property_valuations_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_advisor_assignments" ADD CONSTRAINT "property_advisor_assignments_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_advisor_assignments" ADD CONSTRAINT "property_advisor_assignments_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_offers" ADD CONSTRAINT "property_offers_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_state_transitions" ADD CONSTRAINT "offer_state_transitions_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "property_offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_state_transitions" ADD CONSTRAINT "offer_state_transitions_performed_by_fkey" FOREIGN KEY ("performed_by") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_messages" ADD CONSTRAINT "contact_messages_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_messages" ADD CONSTRAINT "contact_messages_assigned_advisor_id_fkey" FOREIGN KEY ("assigned_advisor_id") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_message_notes" ADD CONSTRAINT "contact_message_notes_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "contact_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_message_notes" ADD CONSTRAINT "contact_message_notes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_requests" ADD CONSTRAINT "publication_requests_proposed_property_type_id_fkey" FOREIGN KEY ("proposed_property_type_id") REFERENCES "property_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_requests" ADD CONSTRAINT "publication_requests_assigned_advisor_id_fkey" FOREIGN KEY ("assigned_advisor_id") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_requests" ADD CONSTRAINT "publication_requests_decision_by_admin_id_fkey" FOREIGN KEY ("decision_by_admin_id") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_outbox" ADD CONSTRAINT "notification_outbox_notification_log_id_fkey" FOREIGN KEY ("notification_log_id") REFERENCES "notification_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
