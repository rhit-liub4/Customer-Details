namespace backend;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class CustomerContext : DbContext {
    public DbSet<Customer> customers {get; set;}
  
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;Database=master;Trusted_Connection=True;Encrypt=False");
    }
}



public class Customer {
    public int id {get; set;}
    public string fname {get; set;}
    public string lname {get; set;}
    public string favoriteColor {get; set;}
    public string dateOfBirth {get; set;}
    public int currentAge {get; set;}
    public string email {get; set;}
    public string phone {get; set;}
    public bool deleted {get; set;}
}