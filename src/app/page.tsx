"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, BookOpenCheck, Users, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitcher } from '@/components/dashboard/language-switcher';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.044-.53-.044-.315 0-.58.158-.747.254-.214.128-.95.762-1.23 1.417-.214.516-.287.935-.287 1.44z M16 .003C7.167.003 0 7.17 0 16.003c0 2.82 1.14 5.333 2.992 7.25L1.29 32l8.842-1.7.002.002.002.002a15.93 15.93 0 0 0 5.867 1.488c8.835 0 16-7.167 16-15.997C32 7.17 24.835.003 16 .003zm0 29.585a13.522 13.522 0 0 1-6.874-1.92l-.493-.293-5.112 1.023 1.04-4.954-.326-.516A13.562 13.562 0 0 1 2.42 16.003c0-7.466 6.06-13.525 13.58-13.525 7.52 0 13.582 6.06 13.582 13.525 0 7.466-6.062 13.58-13.582 13.58z" /></svg>
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.28 1.36.22 1.14 1.03l-3.37 14.3c-.22.93-1.04 1.15-1.7.71L12.6 16.3l-1.98 1.9c-.2.2-.4.4-.7.4l.26-4.25z"/></svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 28 28" fill="currentColor" {...props}><path d="M22.35 0H25v5.77h-2.65V28H16.8v-5.46h-5.45V16.8h5.45V0h5.55zM0 5.77h5.45v5.45H0V5.77z"/></svg>
);

export default function Home() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'feature_assistant_title',
      description: 'feature_assistant_desc',
    },
    {
      icon: <BookOpenCheck className="h-8 w-8 text-primary" />,
      title: 'feature_courses_title',
      description: 'feature_courses_desc',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'feature_community_title',
      description: 'feature_community_desc',
    },
  ];

  return (
    <div className={`flex min-h-screen flex-col bg-background ${language === 'ar' ? 'font-arabic' : 'font-body'}`}>
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo className="h-8 w-8" />
          <span className="font-headline text-xl font-bold">{t('appName')}</span>
        </Link>
        <nav className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild>
            <Link href="/dashboard">
              {t('launch_app')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {t('hero_title')}
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              {t('hero_subtitle')}
            </p>
          </div>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/dashboard">{t('start_learning_today')}</Link>
            </Button>
          </div>
        </section>

        <section className="bg-card py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('why_us_title')}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col items-center text-center">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="font-headline mt-4">{t(feature.title as any)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t(feature.description as any)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-card">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <div className="relative flex items-center gap-2">
            <Link href="/login" className="absolute inset-0 z-10" aria-label={t('admin_login')}></Link>
            <AppLogo className="h-6 w-6" />
            <p className="text-sm text-muted-foreground">{t('copyright', { year: new Date().getFullYear() })}</p>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <nav className="flex gap-4 sm:gap-6">
              <Link href="https://wa.me/774440982" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <WhatsAppIcon className="h-6 w-6" />
                <span className="sr-only">WhatsApp</span>
              </Link>
              <Link href="https://t.me/Gamalalhwish" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <TelegramIcon className="h-6 w-6" />
                <span className="sr-only">Telegram</span>
              </Link>
              <Link href="https://www.linkedin.com/in/gamal-alhwish" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
               <Link href="https://www.tiktok.com/@gamalalmaqtaryfor" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <TiktokIcon className="h-6 w-6" />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link href="https://x.com/alhwysh787472?s=09" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">X</span>
              </Link>
              <Link href="https://www.instagram.com/gamal_almaqtary_tech_services/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com/@gamalabdualnasseralhwish?si=LUOCx4DVnSWShIJA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </nav>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                {t('terms_of_service')}
              </Link>
              <Link href="#" className="text-sm hover:underline" prefetch={false}>
                {t('privacy')}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
