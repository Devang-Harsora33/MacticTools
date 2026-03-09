export const revalidateProducts = async (id?: string) => {
  try {
    const tags = ["products"];
    if (id) {
      tags.push(`product-${id}`);
    }

    await Promise.all(
      tags.map((tag) =>
        fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tag }),
        })
      )
    );
  } catch (error) {
    console.error("Failed to revalidate:", error);
  }
};
