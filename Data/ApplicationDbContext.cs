/*namespace PcStoreBackend.Data
{
    public class ApplicationDbContext
    {
    }
}*/
using Microsoft.EntityFrameworkCore;
using PcStoreBackend.Models; // Adjust to match your namespace
namespace PcStoreBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        // Add other DbSets for tables like Users, Orders if needed
    }

}