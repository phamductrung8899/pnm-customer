import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ProfileSidebar, type ProfileSection } from '@/components/ProfileSidebar';
import { GeneralInfo } from '@/components/profile/GeneralInfo';
import { LegalInfo } from '@/components/profile/LegalInfo';
import { ContactAddress } from '@/components/profile/ContactAddress';
import { ServiceTerms } from '@/components/profile/ServiceTerms';
import { ServiceContract } from '@/components/profile/ServiceContract';
import { NumberContract } from '@/components/profile/NumberContract';
import { PaymentInfo } from '@/components/profile/PaymentInfo';

const sectionComponents: Record<ProfileSection, React.ComponentType> = {
  general: GeneralInfo,
  legal: LegalInfo,
  contact: ContactAddress,
  terms: ServiceTerms,
  'service-contract': ServiceContract,
  'number-contract': NumberContract,
  payment: PaymentInfo,
};

export default function ProfileManagement() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('general');
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-5rem)] w-full">
        <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4" />
          <ActiveComponent />
        </main>
      </div>
    </SidebarProvider>
  );
}
