INSERT INTO public.packages (name, description, price_monthly, price_yearly, currency, features, is_active)
VALUES (
  'Web Design',
  'Professional website development without AI integrations. Perfect for startups and businesses needing a strong digital presence.',
  800,
  8640,
  'ZAR',
  '["Custom responsive website design", "Up to 10 pages", "SEO optimization", "Contact forms & lead capture", "Mobile-first development", "CMS integration", "30-day post-launch support", "SSL & hosting setup"]'::jsonb,
  true
)
ON CONFLICT DO NOTHING;