using System.Net;
using System.Net.Http.Json;
using CamelRegistry.Data;
using CamelRegistry.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CamelRegistry.Tests;

public class CamelEndpointsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public CamelEndpointsTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<AppDbContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting");
                });
            });
        });

        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task CreateCamel_WithValidData_ReturnsCreated()
    {
        // Arrange
        var newCamel = new Camel
        {
            Name = "TestCamel",
            Color = "Brown",
            HumpCount = 1,
            LastFed = DateTime.Now
        };

        // Act
        var response = await _client.PostAsJsonAsync("/camels", newCamel);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var createdCamel = await response.Content.ReadFromJsonAsync<Camel>();
        Assert.NotNull(createdCamel);
        Assert.Equal(newCamel.Name, createdCamel.Name);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(3)]
    public async Task CreateCamel_WithInvalidHumpCount_ReturnsBadRequest(int invalidHumpCount)
    {
        // Arrange
        var newCamel = new Camel
        {
            Name = "InvalidCamel",
            Color = "Grey",
            HumpCount = invalidHumpCount,
            LastFed = DateTime.Now
        };

        // Act
        var response = await _client.PostAsJsonAsync("/camels", newCamel);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetCamel_WithInvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.GetAsync("/camels/9999");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task CreateCamel_WithDuplicateId_ReturnsConflict()
    {
        // Arrange
        var camel = new Camel
        {
            Id = 123,
            Name = "DuplicateCamel",
            HumpCount = 1,
            LastFed = DateTime.Now
        };

        // Act
        // Create first camel
        var response1 = await _client.PostAsJsonAsync("/camels", camel);
        
        // Attempt creating another camel with same ID
        var response2 = await _client.PostAsJsonAsync("/camels", camel);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response1.StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, response2.StatusCode);
    }
}
