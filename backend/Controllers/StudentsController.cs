using Microsoft.AspNetCore.Mvc;
using CodeBackend.Data;
using CodeBackend.Models;

namespace CodeBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Student>> GetAllStudents()
        {
            return Ok(InMemoryDataStore.Students);
        }

        [HttpGet("{id}")]
        public ActionResult<Student> GetStudentById(int id)
        {
            var student = InMemoryDataStore.Students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound(new { message = "Không tìm thấy sinh viên" });
            return Ok(student);
        }
    }
}
