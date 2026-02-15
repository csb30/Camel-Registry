using Microsoft.EntityFrameworkCore;
using CamelRegistry.Models;

namespace CamelRegistry.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Camel> Camels { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {   
        base.OnModelCreating(modelBuilder);
    }
}
