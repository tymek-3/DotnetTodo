using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoApp.Interfaces;
using TodoApp.Models;

namespace TodoApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Todo> Todos { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        public sealed override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AddTimestamps();
            return this.SaveChangesAsync(acceptAllChangesOnSuccess: true, cancellationToken);
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            AddTimestamps();
            return await base.SaveChangesAsync(true, cancellationToken).ConfigureAwait(false);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>().HasOne(t => t.User).WithMany(b => b.Todos).HasForeignKey(p => p.UserId);
        }

        private void AddTimestamps()
        {
            var entries = ChangeTracker.Entries().Where(e => e.Entity is IBaseModel && (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                ((IBaseModel)entry.Entity).ModifiedAt = DateTime.UtcNow;
                if (entry.State == EntityState.Added)
                    ((IBaseModel)entry.Entity).CreatedAt = DateTime.UtcNow;
            }
        }
    }
}