// "use client";

import AllProducts from "@/components/AllProducts";

function CategoryPage({ params }: { params: { categoryId: string } }) {
  if (!params.categoryId)
    return <div className="center">No category found</div>;

  return (
    <div>
      <AllProducts categoryId={params.categoryId} headerText="Results:" />
    </div>
  );
}

export default CategoryPage;
