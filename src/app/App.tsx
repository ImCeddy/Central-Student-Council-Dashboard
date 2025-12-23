import { useState } from 'react';
import { DashboardSidebar } from './components/dashboard-sidebar';
import { DashboardHeader } from './components/dashboard-header';
import { DashboardFooter } from './components/dashboard-footer';
import { FacultyNavBar } from './components/faculty-nav-bar';
import { FacebookEmbed } from './components/facebook-embed';
import { AnnouncementSection } from './components/announcement-section';
import { StatsCard } from './components/stats-card';
import { ScrollToTop } from './components/scroll-to-top';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { facebookPagesConfig, officialPagesConfig, type Announcement } from './config/facebook-pages';
import { Megaphone, CircleAlert, Calendar, TrendingUp } from 'lucide-react';

/**
 * Central Student Council Dashboard Application
 * 
 * This dashboard provides a centralized place for Central Student Council updates.
 * 
 * Features:
 * - Responsive design (mobile and desktop)
 * - Facebook page embeds for real-time updates
 * - Separate sections for Announcements, Urgent alerts, and Events
 * - Beautiful orange/coral theme matching the design
 * 
 * To customize:
 * 1. Edit /src/app/config/facebook-pages.ts to add your Facebook page URLs
 * 2. Update the sample data below with real data from your Facebook pages
 * 3. In production, connect to Facebook Graph API to fetch real-time data
 */

// Sample data - In production, this would come from Facebook API
const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to the new semester!',
    content: 'We are excited to announce the start of a new academic semester. Please check your schedules and join our orientation session.',
    date: 'December 17, 2025',
    source: 'Central Student Council Main',
    type: 'announcement',
  },
];



export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderHome = () => (
    <div className="space-y-6">
      {/* Compact welcome header */}
      <div className="bg-gradient-to-r from-primary to-orange-400 text-white p-4 sm:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Welcome to Central Student Council Dashboard</h1>
            <p className="mt-1 opacity-90 text-sm sm:text-base">
              Stay updated with announcements and community engagement.
            </p>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
              <div className="text-lg font-bold">{sampleAnnouncements.length}</div>
              <div className="text-xs opacity-80">Announcements</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs opacity-80">Alerts</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs opacity-80">Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid - side by side on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Stats cards - take up 1 column on xl screens */}
        <div className="xl:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold">Quick Stats</h2>
          <div className="space-y-3">
            <StatsCard
              title="Total Announcements"
              value={sampleAnnouncements.length}
              description="active"
              icon={Megaphone}
              borderColor="border-l-primary"
              onClick={() => setActiveSection('announcements')}
            />
            <StatsCard
              title="Urgent Alerts"
              value={0}
              description="none active"
              icon={CircleAlert}
              borderColor="border-l-muted"
            />
            <StatsCard
              title="Upcoming Events"
              value={0}
              description="none scheduled"
              icon={Calendar}
              borderColor="border-l-muted"
            />
          </div>
        </div>

        {/* Recent updates - take up 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
            <AnnouncementSection announcements={sampleAnnouncements.slice(0, 3)} type="announcement" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">All Announcements</h1>
          <p className="text-muted-foreground text-sm">
            Stay updated with the latest news and important updates.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          {sampleAnnouncements.length} announcement{sampleAnnouncements.length !== 1 ? 's' : ''}
        </div>
      </div>
      <AnnouncementSection announcements={sampleAnnouncements} type="announcement" />
    </div>
  );

  const renderFacebook = () => (
    <div className="space-y-4">
      {/* Compact header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Facebook Pages</h1>
          <p className="text-muted-foreground text-sm">
            Follow our official Facebook pages for real-time updates.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          {facebookPagesConfig.length} pages available
        </div>
      </div>

      {/* Compact tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
          <TabsTrigger value="all" className="text-xs sm:text-sm py-2">All Pages</TabsTrigger>
          <TabsTrigger value="main" className="text-xs sm:text-sm py-2">Main</TabsTrigger>
          <TabsTrigger value="events" className="text-xs sm:text-sm py-2">Events</TabsTrigger>
          <TabsTrigger value="academics" className="text-xs sm:text-sm py-2">Academics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 xl:gap-8 items-stretch">
            {facebookPagesConfig.map((page) => (
              <div key={page.id} className="min-h-[500px]">
                <FacebookEmbed
                  pageUrl={page.url}
                  title={page.title}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="main" className="mt-4">
          <div className="w-full max-w-4xl xl:max-w-full h-[700px] mx-auto xl:mx-0">
            <FacebookEmbed
              pageUrl={facebookPagesConfig[0].url}
              title={facebookPagesConfig[0].title}
              className="h-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <div className="w-full max-w-4xl xl:max-w-full h-[700px] mx-auto xl:mx-0">
            <FacebookEmbed
              pageUrl={facebookPagesConfig[1].url}
              title={facebookPagesConfig[1].title}
              className="h-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="academics" className="mt-4">
          <div className="w-full max-w-4xl xl:max-w-full h-[700px] mx-auto xl:mx-0">
            <FacebookEmbed
              pageUrl={facebookPagesConfig[2].url}
              title={facebookPagesConfig[2].title}
              className="h-full"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Render official faculty pages
  const renderOfficialPage = (pageId: string) => {
    const page = officialPagesConfig.find((p) => p.id === pageId);
    if (!page) return null;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="mb-2">{page.title}</h1>
          <p className="text-muted-foreground">{page.description}</p>
        </div>
        <div className="w-full max-w-2xl xl:max-w-full mx-auto xl:mx-0 h-96">
          <FacebookEmbed
            pageUrl={page.url}
            title={page.title}
            className="h-full"
          />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'announcements':
        return renderAnnouncements();
      case 'facebook':
        return renderFacebook();
      case 'academic':
      case 'student-affairs':
      case 'admission':
      case 'csc-page':
        return renderOfficialPage(activeSection);
      default:
        return renderHome();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex flex-1">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="w-full max-w-full xl:max-w-7xl xl:mx-auto p-2 sm:p-4 lg:p-4 xl:p-6 pb-20">
            {renderContent()}
          </div>
        </main>
      </div>
      
      <DashboardFooter />
      <FacultyNavBar activeSection={activeSection} onNavigate={setActiveSection} />
      <ScrollToTop />
    </div>
  );
}