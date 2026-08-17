import logging


class SilenciarLibreriasPDF(logging.Filter):
    """
    Descarta la depuración de las librerías que generan los PDF.

    WeasyPrint incrusta las fuentes con fontTools, que emite más de cien
    líneas por documento ("Compiling 'cmap' table"…). En un servidor que
    genera contratos a diario eso llena el journal sin aportar nada.

    Se hace con un filtro en el manejador y no bajando el nivel de los
    registradores porque fontTools fija el nivel en sus propios módulos hijos
    al importarse —de forma diferida, después de que Django haya configurado
    el logging—, así que ajustar el registrador padre no tiene efecto. Un
    filtro se aplica al final de la cadena y no se puede eludir.

    Los avisos y errores sí pasan: si una fuente falta o el PDF falla,
    queremos enterarnos.
    """

    RUIDOSAS = ('fontTools', 'weasyprint', 'PIL')

    def filter(self, record):
        if record.levelno >= logging.WARNING:
            return True
        return not record.name.startswith(self.RUIDOSAS)
