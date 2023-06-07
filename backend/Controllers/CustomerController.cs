using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[customer/controller]")]
public class CustomerController : ControllerBase
{
    private Customer[] customers;
    private readonly ILogger<CustomerController> _logger;

    public CustomerController(ILogger<CustomerController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "AddCustomer")]
    public Customer CreateCustomer(Customer customer){
        var newCustomer = new Customer
        {
            firstName = customer.firstName,
            lastname = customer.lastname,
            color = customer.color,
            dateOfBirth = customer.dateOfBirth,
            currentAge = customer.currentAge,
            email = customer.email,
            phone = customer.phone
        };
        customers.Append(newCustomer);
        return newCustomer;
    }
}
