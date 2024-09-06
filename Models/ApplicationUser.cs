using Microsoft.AspNetCore.Identity;

namespace PcStore.Models  // Adjust the namespace according to your project structure
{
    // ApplicationUser class extends IdentityUser to include additional properties
    public class ApplicationUser : IdentityUser
    {
        // Additional properties for the application user
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
