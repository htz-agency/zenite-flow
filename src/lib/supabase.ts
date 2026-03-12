import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

// Tipos do Database
export type Database = {
  public: {
    Tables: {
      flows: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          description: string | null;
          is_active: boolean;
          total_runs: number;
          successful_runs: number;
          failed_runs: number;
          last_run_at: string | null;
          last_run_status: string | null;
          canvas_zoom: number;
          canvas_x: number;
          canvas_y: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id?: string;
          name: string;
          description?: string | null;
          is_active?: boolean;
          total_runs?: number;
          successful_runs?: number;
          failed_runs?: number;
          last_run_at?: string | null;
          last_run_status?: string | null;
          canvas_zoom?: number;
          canvas_x?: number;
          canvas_y?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          name?: string;
          description?: string | null;
          is_active?: boolean;
          total_runs?: number;
          successful_runs?: number;
          failed_runs?: number;
          last_run_at?: string | null;
          last_run_status?: string | null;
          canvas_zoom?: number;
          canvas_x?: number;
          canvas_y?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      flow_steps: {
        Row: {
          id: string;
          flow_id: string;
          type: string;
          subtype: string | null;
          name: string;
          notes: string | null;
          position_x: number;
          position_y: number;
          config: Record<string, any>;
          is_disabled: boolean;
          color: string | null;
          credential_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          flow_id: string;
          type: string;
          subtype?: string | null;
          name: string;
          notes?: string | null;
          position_x: number;
          position_y: number;
          config?: Record<string, any>;
          is_disabled?: boolean;
          color?: string | null;
          credential_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          flow_id?: string;
          type?: string;
          subtype?: string | null;
          name?: string;
          notes?: string | null;
          position_x?: number;
          position_y?: number;
          config?: Record<string, any>;
          is_disabled?: boolean;
          color?: string | null;
          credential_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      flow_connections: {
        Row: {
          id: string;
          flow_id: string;
          source_step_id: string;
          target_step_id: string;
          source_output: number;
          source_output_label: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          flow_id: string;
          source_step_id: string;
          target_step_id: string;
          source_output?: number;
          source_output_label?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          flow_id?: string;
          source_step_id?: string;
          target_step_id?: string;
          source_output?: number;
          source_output_label?: string | null;
          created_at?: string;
        };
      };
      flow_runs: {
        Row: {
          id: string;
          flow_id: string;
          status: 'running' | 'success' | 'error' | 'waiting' | 'cancelled';
          trigger_type: string;
          started_at: string;
          finished_at: string | null;
          duration_ms: number | null;
          error_message: string | null;
          items_processed: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          flow_id: string;
          status?: 'running' | 'success' | 'error' | 'waiting' | 'cancelled';
          trigger_type: string;
          started_at?: string;
          finished_at?: string | null;
          duration_ms?: number | null;
          error_message?: string | null;
          items_processed?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          flow_id?: string;
          status?: 'running' | 'success' | 'error' | 'waiting' | 'cancelled';
          trigger_type?: string;
          started_at?: string;
          finished_at?: string | null;
          duration_ms?: number | null;
          error_message?: string | null;
          items_processed?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      flow_dashboard: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_active: boolean;
          total_runs: number;
          successful_runs: number;
          failed_runs: number;
          last_run_at: string | null;
          last_run_status: string | null;
          success_rate_pct: number | null;
          active_steps_count: number;
          primary_trigger: string | null;
          has_active_portal: boolean;
          has_active_schedule: boolean;
          runs_last_24h: number;
          errors_last_24h: number;
        };
      };
      flow_run_history: {
        Row: {
          id: string;
          flow_id: string;
          status: string;
          trigger_type: string;
          started_at: string;
          finished_at: string | null;
          duration_ms: number | null;
          error_message: string | null;
          flow_name: string;
          steps_executed: number;
          steps_failed: number;
        };
      };
    };
  };
};