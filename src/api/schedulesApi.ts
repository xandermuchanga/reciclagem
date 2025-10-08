
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Schedule = Tables<'schedules'>;

// Get all schedules
export const getSchedules = async (): Promise<Schedule[]> => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching schedules:', error);
    throw error;
  }

  return data || [];
};

// Get schedules by user (as requester or provider)
export const getUserSchedules = async (userId: string): Promise<Schedule[]> => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .or(`requester_id.eq.${userId},provider_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user schedules:', error);
    throw error;
  }

  return data || [];
};

// Get schedule by ID
export const getScheduleById = async (id: string): Promise<Schedule | null> => {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching schedule with ID ${id}:`, error);
    throw error;
  }

  return data;
};

// Create a new schedule
export const createSchedule = async (schedule: Omit<Schedule, 'id' | 'created_at'>): Promise<Schedule> => {
  const { data, error } = await supabase
    .from('schedules')
    .insert([schedule])
    .select()
    .single();

  if (error) {
    console.error('Error creating schedule:', error);
    throw error;
  }

  return data;
};

// Update an existing schedule
export const updateSchedule = async (id: string, schedule: Partial<Schedule>): Promise<Schedule> => {
  const { data, error } = await supabase
    .from('schedules')
    .update(schedule)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating schedule with ID ${id}:`, error);
    throw error;
  }

  return data;
};

// Delete a schedule
export const deleteSchedule = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting schedule with ID ${id}:`, error);
    throw error;
  }
};
