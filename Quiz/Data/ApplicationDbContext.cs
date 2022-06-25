using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Quiz.Models;

namespace Quiz.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Option> Options { get; set; }

        public DbSet<Models.Quiz> Quizzes { get; set; }

        public DbSet<QuizQuestion> QuizQuestions { get; set; }

        public DbSet<Attempt> Attempts { get; set; }

        public DbSet<AttemptDetail> AttemptDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

    }
}