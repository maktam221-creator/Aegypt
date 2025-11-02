
// The generation of sample posts has been disabled to ensure all content
// originates from real, authenticated users. This file is kept for structure
// but the core functionality has been removed.

export async function generateSamplePosts(): Promise<Omit<import('../types').Post, 'id' | 'timestamp'>[]> {
  // Always return an empty array to prevent fake posts from being generated.
  return [];
}
