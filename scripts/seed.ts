import { createClient } from '@supabase/supabase-js';
import menuData from '../data/menu-seed.json' with { type: 'json' };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function seed() {
  console.log('🌱 Seeding SALTed database...\n');

  // 0. Clean wipe (variants cascade from menu_items)
  await supabase.from('menu_items').delete().gte('created_at', '1900-01-01');
  await supabase.from('categories').delete().gte('created_at', '1900-01-01');
  console.log('🧹 Cleared existing menu items & categories');

  // 1. Categories
  const { data: cats, error: catErr } = await supabase
    .from('categories')
    .upsert(
      menuData.categories.map((c) => ({ name: c.name, slug: c.slug, order: c.order })),
      { onConflict: 'slug' }
    )
    .select();
  if (catErr) throw catErr;
  const catMap = Object.fromEntries(cats!.map((c) => [c.slug, c.id]));
  console.log(`✅ Categories: ${cats!.length} upserted`);

  // 2. Menu items + variants
  for (const item of menuData.menuItems) {
    const { variants, category: catSlug, basePrice, imageUrl, featured, ...rest } = item;

    const { data: mi, error: miErr } = await supabase
      .from('menu_items')
      .upsert(
        {
          ...rest,
          base_price: basePrice,
          image_url: imageUrl,
          featured: featured ?? false,
          category_id: catMap[catSlug],
        },
        { onConflict: 'name' }
      )
      .select()
      .single();
    if (miErr) throw miErr;

    if (variants.length > 0) {
      await supabase.from('variants').delete().eq('menu_item_id', mi.id);
      const { error: vErr } = await supabase
        .from('variants')
        .insert(variants.map((v) => ({ menu_item_id: mi.id, name: v.name, price_add: v.priceAdd })));
      if (vErr) throw vErr;
    }

    console.log(`  ✅ ${mi.name}`);
  }

  // 3. Settings
  const { error: sErr } = await supabase
    .from('settings')
    .upsert(menuData.settings, { onConflict: 'key' });
  if (sErr) throw sErr;
  console.log('\n✅ Settings seeded');

  console.log('\n🎉 Seed complete! SALTed is ready.');
  console.log('👤 Create the admin user in Supabase dashboard → Authentication → Users');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
