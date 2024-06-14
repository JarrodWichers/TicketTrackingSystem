using Microsoft.EntityFrameworkCore;
using TicketTrackingSystemBack.Models;

namespace TicketTrackingSystemBack.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Bug> Bugs { get; set; }
    }
}
