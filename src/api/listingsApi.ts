
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Listing = Tables<'listings'>;

// Get all listings
export const getListings = async (): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }

  return data || [];
};

// Get recent listings (limited number)
export const getRecentListings = async (limit: number = 4): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent listings:', error);
    throw error;
  }

  return data || [];
};

// Get listing by ID
export const getListingById = async (id: string): Promise<Listing | null> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching listing with ID ${id}:`, error);
    throw error;
  }

  return data;
};

// Create a new listing
export const createListing = async (listing: Omit<Listing, 'id' | 'created_at'>): Promise<Listing> => {
  const { data, error } = await supabase
    .from('listings')
    .insert([listing])
    .select()
    .single();

  if (error) {
    console.error('Error creating listing:', error);
    throw error;
  }

  return data;
};

// Update an existing listing
export const updateListing = async (id: string, listing: Partial<Listing>): Promise<Listing> => {
  const { data, error } = await supabase
    .from('listings')
    .update(listing)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating listing with ID ${id}:`, error);
    throw error;
  }

  return data;
};

// Delete a listing
export const deleteListing = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting listing with ID ${id}:`, error);
    throw error;
  }
};
