import EventManagement from '@/components/pages/EventManagement/EventManagement'
import SectionTitle from '@/components/shared/SectionTitle/SectionTitle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const EventManagementPage = () => {
  return (
    <div className="max-w-7xl mx-auto pt-28 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/event">
              All Events
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-8">
        <SectionTitle
          className="md:text-5xl"
          title="All Events"
          description="All Events are here for you to choose from."
        />
      </div>

      <EventManagement />
    </div>

  )
}

export default EventManagementPage