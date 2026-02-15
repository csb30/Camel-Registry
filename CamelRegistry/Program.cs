using CamelRegistry.Data;
using CamelRegistry.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Database Context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=camelregistry.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");

// Ensure Database is Created on Startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Minimal API Endpoints
var group = app.MapGroup("/camels").WithTags("Camels");

// GET /: List all camels
group.MapGet("/", async (AppDbContext db) =>
    await db.Camels.ToListAsync());

// GET /{id}: Get a specific camel
group.MapGet("/{id}", async (int id, AppDbContext db) =>
    await db.Camels.FindAsync(id)
        is Camel camel
            ? Results.Ok(camel)
            : Results.NotFound());

// POST /: Create a new Camel
group.MapPost("/", async (Camel camel, AppDbContext db) =>
{
    if (camel.HumpCount < 1 || camel.HumpCount > 2)
    {
        return Results.BadRequest("HumpCount must be 1 or 2.");
    }

    db.Camels.Add(camel);
    await db.SaveChangesAsync();

    return Results.Created($"/camels/{camel.Id}", camel);
});

// PUT /{id}: Update an existing Camel
group.MapPut("/{id}", async (int id, Camel inputCamel, AppDbContext db) =>
{
    var camel = await db.Camels.FindAsync(id);

    if (camel is null) return Results.NotFound();

    if (inputCamel.HumpCount < 1 || inputCamel.HumpCount > 2)
    {
        return Results.BadRequest("HumpCount must be 1 or 2.");
    }

    camel.Name = inputCamel.Name;
    camel.Color = inputCamel.Color;
    camel.HumpCount = inputCamel.HumpCount;
    camel.LastFed = inputCamel.LastFed;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

// DELETE /{id}: Delete a camel
group.MapDelete("/{id}", async (int id, AppDbContext db) =>
{
    if (await db.Camels.FindAsync(id) is Camel camel)
    {
        db.Camels.Remove(camel);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
