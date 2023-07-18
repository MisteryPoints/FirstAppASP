using System;
using System.Collections.Generic;

namespace FirstApp.Models;

public partial class Tarea
{
    public int IdTarea { get; set; }

    public string? Descripcion { get; set; }

    public DateTime? FechaRegistro { get; set; }
}
