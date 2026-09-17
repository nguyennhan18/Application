using Microsoft.AspNetCore.Mvc;
using CodeBackend.Models;
using CodeBackend.Services;

namespace CodeBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Uc9Controller : ControllerBase
    {
        private readonly IUc9Service _uc9Service;

        public Uc9Controller(IUc9Service uc9Service)
        {
            _uc9Service = uc9Service;
        }

        [HttpGet("student/{id}")]
        public ActionResult<Student> GetStudentDossier(int id)
        {
            var student = _uc9Service.GetStudentDossier(id);
            if (student == null) return NotFound(new { message = "Không tìm thấy sinh viên" });
            return Ok(student);
        }

        [HttpPost("evaluate")]
        public ActionResult<Uc9AssessmentResponse> EvaluateRubrics([FromBody] Uc9AssessmentRequest request)
        {
            var result = _uc9Service.EvaluateRubrics(request);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
