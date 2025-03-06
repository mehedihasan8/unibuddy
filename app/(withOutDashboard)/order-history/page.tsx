import OrderHistory from '@/components/pages/OrderHistory/OrderHistory'
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const OrderHistoryPage = () => {
    return (
        <div className="max-w-7xl mx-auto pt-28 px-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/order-history">
                           Order History
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-8">
                <SectionTitle
                    className="md:text-5xl"
                    title="Order History"
                    description="Our Cafeteria Menu and Services are here for you to choose from."
                />
            </div>

            <OrderHistory />

        </div>
    );
};

export default OrderHistoryPage;
