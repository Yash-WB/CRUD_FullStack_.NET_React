// Data/MyAppContext.cs
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class MyAppContext : DbContext
    {
        public DbSet<Item> Items { get; set; } // DbSet for Item entity

        public MyAppContext(DbContextOptions<MyAppContext> options) : base(options)
        {
            // Initialize DbSet
            Items = Set<Item>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entity mappings, relationships, etc. here if needed
            base.OnModelCreating(modelBuilder);
        }
    }
}
