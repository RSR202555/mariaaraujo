export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'ADMIN' | 'PERSONAL' | 'ALUNO';
export type ConsultancyStatus = 'PENDING' | 'ACTIVE' | 'PAUSED' | 'EXPIRED' | 'CANCELLED';
export type SubscriptionStatus = 'PENDING' | 'ACTIVE' | 'OVERDUE' | 'CANCELLED' | 'EXPIRED';
export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'RECEIVED' | 'OVERDUE' | 'REFUNDED' | 'FAILED';
export type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'BOLETO';
export type AnamnesisStatus = 'DRAFT' | 'SUBMITTED' | 'REVIEWED';
export type EvaluationRequestStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';
export type PhotoType = 'FRONT' | 'BACK' | 'SIDE_LEFT' | 'SIDE_RIGHT' | 'EXTRA';
export type ProtocolStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
export type NotificationType = 'SYSTEM' | 'PAYMENT' | 'PROTOCOL' | 'EVALUATION' | 'MESSAGE';
export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      personal_trainers: {
        Row: {
          id: string;
          profile_id: string;
          cref: string | null;
          bio: string | null;
          specialties: string[] | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          cref?: string | null;
          bio?: string | null;
          specialties?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          cref?: string | null;
          bio?: string | null;
          specialties?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "personal_trainers_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      students: {
        Row: {
          id: string;
          profile_id: string;
          personal_trainer_id: string | null;
          asaas_customer_id: string | null;
          birth_date: string | null;
          gender: string | null;
          height_cm: number | null;
          status: ConsultancyStatus;
          mfit_link: string | null;
          dietbox_link: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          personal_trainer_id?: string | null;
          asaas_customer_id?: string | null;
          birth_date?: string | null;
          gender?: string | null;
          height_cm?: number | null;
          status?: ConsultancyStatus;
          mfit_link?: string | null;
          dietbox_link?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          personal_trainer_id?: string | null;
          asaas_customer_id?: string | null;
          birth_date?: string | null;
          gender?: string | null;
          height_cm?: number | null;
          status?: ConsultancyStatus;
          mfit_link?: string | null;
          dietbox_link?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "students_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "students_personal_trainer_id_fkey";
            columns: ["personal_trainer_id"];
            isOneToOne: false;
            referencedRelation: "personal_trainers";
            referencedColumns: ["id"];
          }
        ];
      };
      plans: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          price_monthly: number;
          price_quarterly: number;
          features_json: Json;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          price_monthly: number;
          price_quarterly: number;
          features_json?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          price_monthly?: number;
          price_quarterly?: number;
          features_json?: Json;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      consultancies: {
        Row: {
          id: string;
          student_id: string;
          personal_trainer_id: string | null;
          plan_id: string;
          start_date: string;
          end_date: string | null;
          status: ConsultancyStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          personal_trainer_id?: string | null;
          plan_id: string;
          start_date?: string;
          end_date?: string | null;
          status?: ConsultancyStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          personal_trainer_id?: string | null;
          plan_id?: string;
          start_date?: string;
          end_date?: string | null;
          status?: ConsultancyStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "consultancies_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "consultancies_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["id"];
          }
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          student_id: string;
          plan_id: string;
          asaas_subscription_id: string;
          asaas_customer_id: string;
          status: SubscriptionStatus;
          billing_type: PaymentMethod;
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          plan_id: string;
          asaas_subscription_id: string;
          asaas_customer_id: string;
          status?: SubscriptionStatus;
          billing_type?: PaymentMethod;
          current_period_start: string;
          current_period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          plan_id?: string;
          asaas_subscription_id?: string;
          asaas_customer_id?: string;
          status?: SubscriptionStatus;
          billing_type?: PaymentMethod;
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["id"];
          }
        ];
      };
      payments: {
        Row: {
          id: string;
          subscription_id: string | null;
          student_id: string;
          asaas_payment_id: string;
          amount: number;
          status: PaymentStatus;
          billing_type: PaymentMethod;
          invoice_url: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subscription_id?: string | null;
          student_id: string;
          asaas_payment_id: string;
          amount: number;
          status?: PaymentStatus;
          billing_type: PaymentMethod;
          invoice_url?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string | null;
          student_id?: string;
          asaas_payment_id?: string;
          amount?: number;
          status?: PaymentStatus;
          billing_type?: PaymentMethod;
          invoice_url?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_subscription_id_fkey";
            columns: ["subscription_id"];
            isOneToOne: false;
            referencedRelation: "subscriptions";
            referencedColumns: ["id"];
          }
        ];
      };
      anamneses: {
        Row: {
          id: string;
          student_id: string;
          title: string;
          status: AnamnesisStatus;
          ai_summary: string | null;
          submitted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          title?: string;
          status?: AnamnesisStatus;
          ai_summary?: string | null;
          submitted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          title?: string;
          status?: AnamnesisStatus;
          ai_summary?: string | null;
          submitted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "anamneses_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      anamnesis_answers: {
        Row: {
          id: string;
          anamnesis_id: string;
          question_key: string;
          answer_value: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          anamnesis_id: string;
          question_key: string;
          answer_value: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          anamnesis_id?: string;
          question_key?: string;
          answer_value?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "anamnesis_answers_anamnesis_id_fkey";
            columns: ["anamnesis_id"];
            isOneToOne: false;
            referencedRelation: "anamneses";
            referencedColumns: ["id"];
          }
        ];
      };
      evaluation_requests: {
        Row: {
          id: string;
          student_id: string;
          status: EvaluationRequestStatus;
          notes: string | null;
          requested_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          status?: EvaluationRequestStatus;
          notes?: string | null;
          requested_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          status?: EvaluationRequestStatus;
          notes?: string | null;
          requested_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evaluation_requests_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      evaluations: {
        Row: {
          id: string;
          student_id: string;
          personal_trainer_id: string | null;
          evaluation_request_id: string | null;
          notes: string | null;
          feedback: string | null;
          evaluated_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          personal_trainer_id?: string | null;
          evaluation_request_id?: string | null;
          notes?: string | null;
          feedback?: string | null;
          evaluated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          personal_trainer_id?: string | null;
          evaluation_request_id?: string | null;
          notes?: string | null;
          feedback?: string | null;
          evaluated_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evaluations_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      evaluation_photos: {
        Row: {
          id: string;
          evaluation_id: string;
          cloudinary_public_id: string;
          secure_url: string;
          photo_type: PhotoType;
          ai_analysis_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          evaluation_id: string;
          cloudinary_public_id: string;
          secure_url: string;
          photo_type: PhotoType;
          ai_analysis_json?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          evaluation_id?: string;
          cloudinary_public_id?: string;
          secure_url?: string;
          photo_type?: PhotoType;
          ai_analysis_json?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evaluation_photos_evaluation_id_fkey";
            columns: ["evaluation_id"];
            isOneToOne: false;
            referencedRelation: "evaluations";
            referencedColumns: ["id"];
          }
        ];
      };
      body_measurements: {
        Row: {
          id: string;
          evaluation_id: string | null;
          student_id: string;
          chest_cm: number | null;
          waist_cm: number | null;
          hips_cm: number | null;
          arms_cm: number | null;
          thighs_cm: number | null;
          calves_cm: number | null;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          evaluation_id?: string | null;
          student_id: string;
          chest_cm?: number | null;
          waist_cm?: number | null;
          hips_cm?: number | null;
          arms_cm?: number | null;
          thighs_cm?: number | null;
          calves_cm?: number | null;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          evaluation_id?: string | null;
          student_id?: string;
          chest_cm?: number | null;
          waist_cm?: number | null;
          hips_cm?: number | null;
          arms_cm?: number | null;
          thighs_cm?: number | null;
          calves_cm?: number | null;
          recorded_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "body_measurements_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      weight_history: {
        Row: {
          id: string;
          student_id: string;
          weight_kg: number;
          fat_percentage: number | null;
          muscle_mass_kg: number | null;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          weight_kg: number;
          fat_percentage?: number | null;
          muscle_mass_kg?: number | null;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          weight_kg?: number;
          fat_percentage?: number | null;
          muscle_mass_kg?: number | null;
          recorded_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "weight_history_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      student_progress: {
        Row: {
          id: string;
          student_id: string;
          period_start: string;
          period_end: string;
          summary_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          period_start: string;
          period_end: string;
          summary_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          period_start?: string;
          period_end?: string;
          summary_notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      goals: {
        Row: {
          id: string;
          student_id: string;
          title: string;
          target_value: number | null;
          current_value: number | null;
          unit: string | null;
          deadline: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          title: string;
          target_value?: number | null;
          current_value?: number | null;
          unit?: string | null;
          deadline?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          title?: string;
          target_value?: number | null;
          current_value?: number | null;
          unit?: string | null;
          deadline?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goals_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      protocols: {
        Row: {
          id: string;
          student_id: string;
          personal_trainer_id: string | null;
          title: string;
          description: string | null;
          status: ProtocolStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          personal_trainer_id?: string | null;
          title: string;
          description?: string | null;
          status?: ProtocolStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          personal_trainer_id?: string | null;
          title?: string;
          description?: string | null;
          status?: ProtocolStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "protocols_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      protocol_versions: {
        Row: {
          id: string;
          protocol_id: string;
          version_number: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          protocol_id: string;
          version_number: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          protocol_id?: string;
          version_number?: number;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "protocol_versions_protocol_id_fkey";
            columns: ["protocol_id"];
            isOneToOne: false;
            referencedRelation: "protocols";
            referencedColumns: ["id"];
          }
        ];
      };
      training_links: {
        Row: {
          id: string;
          protocol_version_id: string;
          exercise_name: string;
          video_url: string | null;
          sets: number;
          reps: string;
          rest_seconds: number | null;
          notes: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          protocol_version_id: string;
          exercise_name: string;
          video_url?: string | null;
          sets?: number;
          reps?: string;
          rest_seconds?: number | null;
          notes?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          protocol_version_id?: string;
          exercise_name?: string;
          video_url?: string | null;
          sets?: number;
          reps?: string;
          rest_seconds?: number | null;
          notes?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "training_links_protocol_version_id_fkey";
            columns: ["protocol_version_id"];
            isOneToOne: false;
            referencedRelation: "protocol_versions";
            referencedColumns: ["id"];
          }
        ];
      };
      nutrition_links: {
        Row: {
          id: string;
          protocol_version_id: string;
          title: string;
          external_link: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          protocol_version_id: string;
          title: string;
          external_link?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          protocol_version_id?: string;
          title?: string;
          external_link?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "nutrition_links_protocol_version_id_fkey";
            columns: ["protocol_version_id"];
            isOneToOne: false;
            referencedRelation: "protocol_versions";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          receiver_id?: string;
          content?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          message: string;
          type: NotificationType;
          is_read: boolean;
          link: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          message: string;
          type?: NotificationType;
          is_read?: boolean;
          link?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          title?: string;
          message?: string;
          type?: NotificationType;
          is_read?: boolean;
          link?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      appointments: {
        Row: {
          id: string;
          student_id: string;
          personal_trainer_id: string | null;
          scheduled_at: string;
          status: AppointmentStatus;
          meeting_link: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          personal_trainer_id?: string | null;
          scheduled_at: string;
          status?: AppointmentStatus;
          meeting_link?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          personal_trainer_id?: string | null;
          scheduled_at?: string;
          status?: AppointmentStatus;
          meeting_link?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "students";
            referencedColumns: ["id"];
          }
        ];
      };
      files: {
        Row: {
          id: string;
          uploaded_by: string | null;
          file_name: string;
          file_type: string;
          file_size: number;
          storage_provider: string;
          file_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          uploaded_by?: string | null;
          file_name: string;
          file_type: string;
          file_size: number;
          storage_provider?: string;
          file_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          uploaded_by?: string | null;
          file_name?: string;
          file_type?: string;
          file_size?: number;
          storage_provider?: string;
          file_url?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "files_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          resource: string;
          ip_address: string | null;
          details_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          resource: string;
          ip_address?: string | null;
          details_json?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          resource?: string;
          ip_address?: string | null;
          details_json?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      onboarding_drafts: {
        Row: {
          id: string;
          user_id: string;
          current_step: number;
          step_data: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_step?: number;
          step_data?: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_step?: number;
          step_data?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "onboarding_drafts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: UserRole;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_personal: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      get_student_id: {
        Args: { p_profile_id: string };
        Returns: string;
      };
    };
    Enums: {
      user_role: UserRole;
      consultancy_status: ConsultancyStatus;
      subscription_status: SubscriptionStatus;
      payment_status: PaymentStatus;
      payment_method: PaymentMethod;
      anamnesis_status: AnamnesisStatus;
      evaluation_request_status: EvaluationRequestStatus;
      photo_type: PhotoType;
      protocol_status: ProtocolStatus;
      notification_type: NotificationType;
      appointment_status: AppointmentStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
