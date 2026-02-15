using System.ComponentModel.DataAnnotations;

namespace CamelRegistry.Models;

public class Camel
{
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }

    public string? Color { get; set; }

    [Range(1, 2, ErrorMessage = "HumpCount must be 1 or 2")]
    public int HumpCount { get; set; }

    public DateTime LastFed { get; set; }
}
