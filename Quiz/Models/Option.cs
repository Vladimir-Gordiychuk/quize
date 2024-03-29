﻿using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class Option
    {
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public string Text { get; set; }

        public bool Correct { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(QuestionId))]
        public Question Question { get; set; }

    }
}
