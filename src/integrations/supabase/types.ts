export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bonding_curve_trades: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          price: number
          status: string | null
          token_id: string
          total_cost: number
          trade_type: string
          wallet_address: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          price: number
          status?: string | null
          token_id: string
          total_cost: number
          trade_type: string
          wallet_address: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          price?: number
          status?: string | null
          token_id?: string
          total_cost?: number
          trade_type?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "bonding_curve_trades_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      dex_trades: {
        Row: {
          created_at: string | null
          id: string
          paired_token_amount: number
          pool_id: string
          price: number
          token_amount: number
          trade_type: string
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          paired_token_amount: number
          pool_id: string
          price: number
          token_amount: number
          trade_type: string
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          paired_token_amount?: number
          pool_id?: string
          price?: number
          token_amount?: number
          trade_type?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "dex_trades_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "liquidity_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      liquidity_pools: {
        Row: {
          created_at: string | null
          id: string
          paired_token_address: string
          paired_token_amount: number
          status: string | null
          token_amount: number
          token_id: string
          total_liquidity_shares: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          paired_token_address: string
          paired_token_amount?: number
          status?: string | null
          token_amount?: number
          token_id: string
          total_liquidity_shares?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          paired_token_address?: string
          paired_token_amount?: number
          status?: string | null
          token_amount?: number
          token_id?: string
          total_liquidity_shares?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "liquidity_pools_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      liquidity_positions: {
        Row: {
          created_at: string | null
          id: string
          liquidity_shares: number
          pool_id: string
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          liquidity_shares?: number
          pool_id: string
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          liquidity_shares?: number
          pool_id?: string
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "liquidity_positions_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "liquidity_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          created_at: string | null
          current_bonding_price: number | null
          description: string | null
          holders: number | null
          id: string
          image_url: string | null
          name: string
          progress: number | null
          remaining_tokens: number
          status: string | null
          token_address: string
          total_supply: number
          transactions: number | null
        }
        Insert: {
          created_at?: string | null
          current_bonding_price?: number | null
          description?: string | null
          holders?: number | null
          id?: string
          image_url?: string | null
          name: string
          progress?: number | null
          remaining_tokens: number
          status?: string | null
          token_address: string
          total_supply: number
          transactions?: number | null
        }
        Update: {
          created_at?: string | null
          current_bonding_price?: number | null
          description?: string | null
          holders?: number | null
          id?: string
          image_url?: string | null
          name?: string
          progress?: number | null
          remaining_tokens?: number
          status?: string | null
          token_address?: string
          total_supply?: number
          transactions?: number | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          token_id: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          token_id?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          token_id?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
