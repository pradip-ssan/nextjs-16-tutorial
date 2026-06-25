import { getItems, createItem, deleteItem } from "@/actions/itemActions";

export default async function Page() {
  const items = await getItems();

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Mongoose CRUD Operations</h1>

      {/* CREATE FORM */}
      <section
        style={{
          marginBottom: "2rem",
          borderBottom: "1px solid #ccc",
          paddingBottom: "1rem",
        }}
      >
        <h2>Add New Item</h2>
        <form
          action={createItem}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            style={{ padding: "0.5rem" }}
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            style={{ padding: "0.5rem" }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem",
              background: "#0070f3",
              color: "#fff",
              border: "none",
            }}
          >
            Submit Item
          </button>
        </form>
      </section>

      {/* READ & DELETE LIST */}
      <section>
        <h2>Existing Items</h2>
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                {/* DELETE OPERATION */}
                <form
                  action={async () => {
                    "use server";
                    await deleteItem(item.id);
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      background: "#ff4d4d",
                      color: "#fff",
                      border: "none",
                      padding: "0.25rem 0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
