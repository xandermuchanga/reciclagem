import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Location = Tables<'locations'>;
// Get all locations
export const getLocations = async (): Promise<Location[]> => {
  const { data, error } = await supabase
    .from('locations')
    .select('*');

  if (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }

  return data || [];
};

// Get location by ID
export const getLocationById = async (id: string): Promise<Location | null> => {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    throw error;
  }

  return data;
};

// Create a new location
export const createLocation = async (location: Omit<Location, 'id' | 'created_at'>): Promise<Location> => {
  const { data, error } = await supabase
    .from('locations')
    .insert([location])
    .select()
    .single();

  if (error) {
    console.error('Error creating location:', error);
    throw error;
  }

  return data;
};

// Update an existing location
export const updateLocation = async (id: string, location: Partial<Location>): Promise<Location> => {
  const { data, error } = await supabase
    .from('locations')
    .update(location)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating location with ID ${id}:`, error);
    throw error;
  }

  return data;
};

// Delete a location
export const deleteLocation = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('locations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting location with ID ${id}:`, error);
    throw error;
  }
};
