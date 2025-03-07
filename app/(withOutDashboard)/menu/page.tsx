import CafeteriaMenu from "@/components/pages/CafeteriaMenu/CafeteriaMenu";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CafeteriaMenuPage = () => {
  return (
    <div className="max-w-7xl mx-auto pt-28 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/menu">
              Cafeteria Menu && Services
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-8">
        <SectionTitle
          className="md:text-5xl"
          title="Delicious Bites & Quality Service"
          description="Explore our mouth-watering menu and top-notch services. Satisfaction guaranteed!"
        />

      </div>

      <CafeteriaMenu />
    </div>
  );
};

export default CafeteriaMenuPage;
