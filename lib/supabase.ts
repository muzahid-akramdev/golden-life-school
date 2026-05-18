import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      notices: {
        Row: {
          id: string
          title: string
          file_url: string
          file_type: 'pdf' | 'image'
          created_at: string
          is_important: boolean
        }
      }
      students: {
        Row: {
          id: string
          roll: string
          name: string
          class: string
          section: string | null
          session: string
          father_name: string
          mother_name: string
          phone: string
          created_at: string
        }
      }
      results: {
        Row: {
          id: string
          student_id: string
          exam_type: string
          subject: string
          marks_obtained: number
          full_marks: number
          class: string
          section: string | null
          session: string
          created_at: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          image_url: string
          category: string
          created_at: string
        }
      }
      blogs: {
        Row: {
          id: string
          title: string
          content: string
          image_url: string | null
          author: string
          created_at: string
          is_published: boolean
        }
      }
      admissions: {
        Row: {
          id: string
          student_name_bn: string
          student_name_en: string
          father_name_bn: string
          father_name_en: string
          mother_name_bn: string
          mother_name_en: string
          class_applying: string
          phone_father: string
          phone_mother: string
          address_permanent: string
          address_current: string
          dob: string
          religion: string
          nationality: string
          previous_school: string | null
          created_at: string
          status: 'pending' | 'approved' | 'rejected'
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          message: string
          created_at: string
          is_read: boolean
        }
      }
    }
  }
}
