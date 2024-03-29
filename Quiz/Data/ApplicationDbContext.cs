﻿using Duende.IdentityServer.EntityFramework.Options;
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

            builder.Entity<QuizQuestion>()
                .HasKey(nameof(QuizQuestion.QuizId), nameof(QuizQuestion.QuestionId));

            builder.Entity<Models.Quiz>()
                .HasMany<Question>(quiz => quiz.Questions)
                .WithMany(question => question.Quizzes)
                .UsingEntity<QuizQuestion>(
                j => j
                    .HasOne(pt => pt.Question)
                    .WithMany(question => question.QuizQuestions)
                    .HasForeignKey(pt => pt.QuestionId),
                j => j
                    .HasOne(pt => pt.Quiz)
                    .WithMany(quiz => quiz.QuizQuestions)
                    .HasForeignKey(pt => pt.QuizId));

            builder.Entity<Models.Quiz>()
                .Property<string>(nameof(Models.Quiz.AuthorId))
                .IsRequired(false);

        }

    }
}