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
          title="Cafeteria Menu && Services"
          description="Our Cafeteria Menu and Services are here for you to choose from."
        />
      </div>

      <CafeteriaMenu />
    </div>
  );
};

export default CafeteriaMenuPage;
