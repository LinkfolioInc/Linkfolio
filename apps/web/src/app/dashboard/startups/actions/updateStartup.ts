'use server';

import { createSClient } from '@/supabase/server';
import { Startup } from '@lf/utils';

export async function updateStartup(data: Startup) {
  const supabase = await createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error: updateError } = await supabase
    .from('startups')
    .update({
      ...data,
    })
    .eq('id', data.id)
    .eq('user_id', user?.id);

  if (updateError) {
    return {
      success: false,
      message: `Startup update error. ${updateError.message}`,
    };
  }

  return {
    success: true,
    message: 'Startup update successfull.',
  };
}
