using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Claims;

namespace Quiz.Utils
{
    /// <summary>
    /// Added <see cref="GetCurrentUserId(ControllerBase)"/> method to get user Id as string.
    /// </summary>
    /// <remarks>
    /// Yep, this class seems weird, but I don't want to make a full-price class extension
    /// using inheritance just yet.
    /// </remarks>
    public static class ControllerBaseExtensions
    {

        public static string GetCurrentUserId(this ControllerBase controller)
        {
            var claimsIdentity = controller.User.Identity as ClaimsIdentity;
            Debug.Assert(claimsIdentity != null, "User is required to be logged in.");
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            Debug.Assert(claim != null, "All valid users are supposed to have an Id.");
            return claim.Value;
        }

    }
}
