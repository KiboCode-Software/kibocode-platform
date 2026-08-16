"""
Carga las 4 plantillas de documento de KiboCode.

El texto reproduce los PDFs que hoy se editan a mano; lo único que cambia
es que los valores variables ahora son placeholders poblados desde la base
de datos. Es idempotente: se puede volver a correr para actualizar el texto.

    python manage.py seed_templates
"""

from django.core.management.base import BaseCommand

from apps.documents.models import DocumentStyle, DocumentTemplate

CONTRATO_HTML = """
<p><strong>Entre los suscritos:</strong></p>

<p>De una parte, <strong>{{ kibo.razon_social }}</strong>, identificado con cédula de ciudadanía
N.° {{ kibo.documento }}, quien actúa en nombre propio bajo el nombre comercial
<strong>{{ kibo.nombre_comercial }}</strong> (en adelante, "EL PRESTADOR"), y de otra parte,
<strong>{{ nombre_cliente }}</strong>, identificado con {{ cedula_nit_cliente }},
(en adelante, "EL CLIENTE"), hemos acordado celebrar el presente Contrato de Prestación de
Servicios, el cual se regirá por las siguientes cláusulas:</p>

<h2>Primera — Objeto</h2>
<p>EL PRESTADOR se compromete a desarrollar para EL CLIENTE el siguiente proyecto:
<strong>{{ nombre_proyecto }}</strong>, conforme al alcance descrito en el Anexo A
(Propuesta/Cotización N.° {{ numero_propuesta_anexo }}), que hace parte integral de este contrato.</p>

<h2>Segunda — Alcance y entregables</h2>
<p>El alcance del proyecto, sus fases y entregables específicos quedan definidos en el Anexo A.
Cualquier funcionalidad, módulo o requerimiento no incluido explícitamente en el Anexo A se
considera fuera de alcance y será objeto de una cotización adicional, previamente acordada por
escrito entre las partes.</p>

<h2>Tercera — Plazo</h2>
<p>El proyecto se desarrollará en un plazo estimado de <strong>{{ plazo_estimado }}</strong>,
contado a partir de la fecha de pago del primer abono, según el cronograma por fases descrito en
el Anexo A. Los plazos pueden ajustarse por mutuo acuerdo si surgen cambios de alcance
solicitados por EL CLIENTE.</p>

<h2>Cuarta — Valor y forma de pago</h2>
<p>El valor total del proyecto es de <strong>${{ valor_total }} COP</strong>, que se pagará de la
siguiente forma:</p>
<ul>
  <li><strong>{{ porcentaje_pago_inicial }}</strong> al momento de la firma de este contrato, como
      abono inicial para dar inicio al desarrollo.</li>
  <li><strong>{{ porcentaje_pago_intermedio }}</strong> al finalizar la fase de desarrollo funcional
      (hito intermedio).</li>
  <li><strong>{{ porcentaje_pago_final }}</strong> contra entrega final y puesta en producción del
      sistema.</li>
</ul>
<p>Los pagos se realizarán mediante {{ metodo_pago }} a la cuenta que EL PRESTADOR indique. En caso
de mora superior a {{ dias_mora_suspension }} días calendario en cualquiera de los pagos, EL
PRESTADOR podrá suspender el desarrollo hasta que se regularice el pago, sin que esto se considere
incumplimiento de su parte.</p>

<h2>Quinta — Propiedad intelectual y código fuente</h2>
<p>Una vez recibido el pago total acordado, EL PRESTADOR cede a EL CLIENTE la totalidad de los
derechos patrimoniales sobre el código fuente, la documentación técnica y los demás entregables
desarrollados específicamente para este proyecto. EL CLIENTE recibirá el código fuente completo,
los accesos a los repositorios y ambientes de producción, y la documentación necesaria para operar
el sistema de forma independiente.</p>
<p>Se exceptúan de esta cesión las herramientas, librerías, componentes de código abierto o
utilidades internas de propiedad previa de EL PRESTADOR que se hayan usado como base del
desarrollo, sobre las cuales EL CLIENTE recibe una licencia de uso permanente como parte del
sistema entregado, pero que EL PRESTADOR puede seguir usando en otros proyectos.</p>

<h2>Sexta — Confidencialidad</h2>
<p>Ambas partes se comprometen a mantener bajo reserva toda la información técnica, comercial o
financiera a la que tengan acceso con ocasión de este contrato, y a no divulgarla a terceros sin
autorización previa y escrita de la otra parte, salvo que la ley exija lo contrario. Esta
obligación se mantiene vigente incluso después de finalizado el proyecto.</p>

<h2>Séptima — Garantía y soporte</h2>
<p>EL PRESTADOR ofrece <strong>{{ dias_soporte_incluido }} días</strong> de soporte post-lanzamiento
sin costo adicional, cubriendo corrección de errores (bugs) del sistema entregado. No cubre nuevas
funcionalidades, cambios de alcance, ni fallas originadas por modificaciones realizadas por
terceros al sistema entregado. Soporte o mantenimiento posterior a este período puede acordarse
mediante un contrato o acuerdo de soporte independiente.</p>

<h2>Octava — Terminación anticipada</h2>
<p>Cualquiera de las partes puede terminar este contrato de forma anticipada, dando aviso escrito
con al menos {{ dias_aviso_terminacion }} días de antelación. En ese caso, EL CLIENTE pagará
proporcionalmente por el trabajo efectivamente ejecutado hasta la fecha de terminación, y EL
PRESTADOR entregará el código y avances desarrollados hasta ese momento.</p>

<h2>Novena — Solución de controversias</h2>
<p>Las partes procurarán resolver cualquier diferencia de forma directa y de buena fe. De no ser
posible, se someterán a la jurisdicción de los jueces competentes en {{ ciudad_firma }}, Colombia.</p>

<hr class="divider" />

<p>Para constancia, se firma en {{ ciudad_firma }}, a {{ fecha_firma }}.</p>

<table class="signatures">
  <tr><th>EL PRESTADOR</th><th>EL CLIENTE</th></tr>
  <tr><td>{{ kibo.razon_social }}</td><td>{{ nombre_cliente }}</td></tr>
  <tr><td>C.C. {{ kibo.documento }}</td><td>{{ cedula_nit_cliente }}</td></tr>
  <tr><td>{{ kibo.nombre_comercial }}</td><td>{{ empresa_cliente }}</td></tr>
</table>
"""

NDA_HTML = """
<p><strong>Acuerdo de Confidencialidad</strong></p>

<p>Entre <strong>{{ kibo.razon_social }}</strong>, actuando bajo el nombre comercial
<strong>{{ kibo.nombre_comercial }}</strong> (en adelante, "KIBOCODE"), y
<strong>{{ nombre_cliente }}</strong> (en adelante, "LA EMPRESA"), se acuerda lo siguiente:</p>

<p><strong>1. Objeto.</strong> Con ocasión del diagnóstico y evaluación de un posible proyecto de
desarrollo de software, LA EMPRESA compartirá con KIBOCODE información de carácter confidencial
sobre su operación, procesos, sistemas, cifras o estrategia (en adelante, "la Información").</p>

<p><strong>2. Compromiso de confidencialidad.</strong> KIBOCODE se compromete a:</p>
<ul>
  <li>Usar la Información únicamente para evaluar y proponer una solución al proyecto en discusión.</li>
  <li>No divulgar la Información a terceros, salvo autorización expresa de LA EMPRESA.</li>
  <li>No usar la Información para ningún fin distinto al aquí acordado.</li>
</ul>

<p><strong>3. Excepciones.</strong> No se considera confidencial la información que ya sea pública,
que KIBOCODE ya conociera antes de recibirla de LA EMPRESA, o que deba divulgarse por requerimiento
legal.</p>

<p><strong>4. Vigencia.</strong> Este acuerdo aplica desde su firma y se mantiene vigente durante
<strong>{{ vigencia }}</strong> después de finalizada la relación entre las partes, se llegue o no a
firmar un contrato de desarrollo.</p>

<p><strong>5. Sin obligación de contratar.</strong> Este acuerdo no obliga a ninguna de las partes a
celebrar un contrato posterior; solo protege la información compartida durante la evaluación.</p>

<p>Para constancia, se firma en {{ ciudad_firma }}, a {{ fecha_firma }}.</p>

<table class="signatures">
  <tr><th>KIBOCODE</th><th>LA EMPRESA</th></tr>
  <tr><td>{{ kibo.razon_social }}</td><td>{{ nombre_cliente }}</td></tr>
  <tr><td>C.C. {{ kibo.documento }}</td><td>{{ cedula_nit_cliente }}</td></tr>
</table>
"""

ACTA_HTML = """
<h2>Acta de entrega de proyecto</h2>
<p class="meta"><strong>Proyecto:</strong> {{ nombre_proyecto }} &nbsp;·&nbsp;
   <strong>Cliente:</strong> {{ nombre_cliente }} &nbsp;·&nbsp;
   <strong>Fecha de entrega:</strong> {{ fecha_entrega }}</p>

<p>Se deja constancia de que {{ kibo.nombre_comercial }} hace entrega formal a
{{ nombre_cliente }} de los siguientes elementos, correspondientes al proyecto
{{ nombre_proyecto }}, conforme al alcance acordado en el contrato y su Anexo A:</p>

<ul class="checklist">
  <li>Código fuente completo, en el repositorio: {{ link_repositorio }}</li>
  <li>Accesos administrativos al sistema en producción (usuarios, contraseñas entregados por
      {{ canal_entrega_accesos }})</li>
  <li>Documentación técnica básica (cómo está construido, cómo desplegar cambios futuros)</li>
  <li>Manual de uso para el equipo del cliente (si aplica)</li>
  <li>Capacitación realizada al equipo del cliente, el día {{ fecha_capacitacion }}</li>
  <li>Datos migrados desde el sistema anterior (si aplicaba en el alcance)</li>
</ul>

<p><strong>Observaciones:</strong> {{ observaciones }}</p>

<p>A partir de la fecha de esta acta, inicia el período de soporte sin costo descrito abajo.</p>

<table class="signatures">
  <tr><th>Entregado por (KiboCode)</th><th>Recibido por (Cliente)</th></tr>
  <tr><td>{{ kibo.razon_social }}</td><td>{{ nombre_cliente }}</td></tr>
</table>

<h2>Política de soporte y garantía</h2>
<p><strong>Soporte incluido sin costo:</strong> {{ dias_soporte_incluido }} días calendario a partir
de la fecha del acta de entrega. Cubre corrección de errores (bugs) del sistema tal como fue
entregado — es decir, cuando algo no funciona como se acordó que debía funcionar.</p>

<p><strong>No cubre:</strong></p>
<ul>
  <li>Nuevas funcionalidades o cambios de alcance no incluidos en el proyecto original.</li>
  <li>Fallas causadas por cambios realizados por el cliente o por terceros sobre el sistema
      entregado.</li>
  <li>Problemas originados por servicios externos fuera del control de KiboCode (hosting,
      proveedores de pago, APIs de terceros que cambien sus condiciones).</li>
</ul>

<p><strong>Cómo se reporta un problema durante el período de soporte:</strong> directo por WhatsApp
al {{ kibo.whatsapp_plain }}, describiendo qué pasó y, si es posible, con una captura de pantalla.
Tiempo de respuesta objetivo: menos de 24 horas hábiles.</p>

<p><strong>Después del período de soporte incluido:</strong> se puede acordar un plan de
mantenimiento mensual o resolver incidencias puntuales bajo cotización, según lo que el cliente
necesite.</p>
"""

PROPUESTA_HTML = """
<p><strong>Preparado para:</strong> {{ nombre_cliente }} &nbsp;·&nbsp;
   <strong>Preparado por:</strong> {{ kibo.nombre_comercial }} — {{ kibo.razon_social }}<br />
   <strong>Fecha:</strong> {{ fecha }} &nbsp;·&nbsp;
   <strong>Validez de esta propuesta:</strong> {{ validez_dias }} días desde la fecha de envío</p>

<h2>1. Lo que nos contaste</h2>
<p>{{ resumen_problema }}</p>

<h2>2. Lo que proponemos</h2>
<p>{{ descripcion_solucion }}</p>

<h2>3. Alcance y entregables</h2>
<table class="data">
  <tr><th>Fase</th><th>Qué incluye</th><th>Duración estimada</th></tr>
  {% for fase in fases %}
  <tr>
    <td>{{ fase.nombre }}</td>
    <td>{{ fase.incluye }}</td>
    <td>{{ fase.duracion }}</td>
  </tr>
  {% endfor %}
</table>
<p style="margin-top:10px"><strong>Explícitamente fuera de alcance:</strong> {{ fuera_de_alcance }}</p>

<h2>4. Inversión</h2>
<table class="data">
  <tr><th>Concepto</th><th>Valor</th></tr>
  <tr><td>Valor total del proyecto</td><td>${{ valor_total }} COP</td></tr>
  <tr><td>Forma de pago</td><td>{{ forma_pago }}</td></tr>
</table>

<h2>5. Lo que garantizamos</h2>
<ul>
  <li>Código fuente 100% tuyo al finalizar el proyecto.</li>
  <li>{{ dias_soporte_incluido }} días de soporte post-lanzamiento sin costo adicional.</li>
  <li>Entregas funcionando cada semana durante el desarrollo — no solo al final.</li>
</ul>

<h2>6. Próximo paso</h2>
<p>Si estás de acuerdo con esta propuesta, el siguiente paso es firmar el contrato de prestación de
servicios y realizar el primer abono para dar inicio al proyecto.</p>
<p>Cualquier pregunta, escríbeme directo por WhatsApp: wa.me/{{ kibo.whatsapp_plain }}</p>
"""


def text(key, label, default='', required=True):
    return {'key': key, 'label': label, 'type': 'text', 'default': default, 'required': required}


def area(key, label, default='', required=False):
    return {'key': key, 'label': label, 'type': 'textarea', 'default': default, 'required': required}


def date(key, label, default='', required=True):
    return {'key': key, 'label': label, 'type': 'date', 'default': default, 'required': required}


TEMPLATES = [
    {
        'slug': 'contrato-prestacion-servicios',
        'name': 'Contrato de Prestación de Servicios',
        'description': 'Contrato principal del proyecto: alcance, plazo, pagos y cesión del código.',
        'style': DocumentStyle.LEGAL,
        'header_title': 'Contrato de Prestación de Servicios',
        'html_template': CONTRATO_HTML,
        'fields': [
            text('nombre_cliente', 'Nombre completo o razón social del cliente'),
            text('cedula_nit_cliente', 'Cédula / NIT del cliente'),
            text('empresa_cliente', 'Empresa del cliente', required=False),
            text('nombre_proyecto', 'Nombre del proyecto'),
            text('numero_propuesta_anexo', 'N.° de propuesta (Anexo A)'),
            text('plazo_estimado', 'Plazo estimado', '8 semanas'),
            text('valor_total', 'Valor total (COP)'),
            text('porcentaje_pago_inicial', 'Pago inicial', '40%'),
            text('porcentaje_pago_intermedio', 'Pago intermedio', '30%'),
            text('porcentaje_pago_final', 'Pago final', '30%'),
            text('metodo_pago', 'Método de pago', 'Bre-B — llave [definir]'),
            text('dias_mora_suspension', 'Días de mora para suspender', '8'),
            text('dias_soporte_incluido', 'Días de soporte incluido', '30'),
            text('dias_aviso_terminacion', 'Días de aviso para terminación', '8'),
            text('ciudad_firma', 'Ciudad de firma'),
            date('fecha_firma', 'Fecha de firma'),
        ],
    },
    {
        'slug': 'acuerdo-confidencialidad-nda',
        'name': 'Acuerdo de Confidencialidad (NDA)',
        'description': 'Protege la información que el cliente comparte durante el diagnóstico.',
        'style': DocumentStyle.LEGAL,
        'header_title': 'Acuerdo de Confidencialidad',
        'html_template': NDA_HTML,
        'fields': [
            text('nombre_cliente', 'Nombre completo o razón social del cliente'),
            text('cedula_nit_cliente', 'Cédula / NIT del cliente'),
            text('vigencia', 'Vigencia', '1 año'),
            text('ciudad_firma', 'Ciudad de firma'),
            date('fecha_firma', 'Fecha de firma'),
        ],
    },
    {
        'slug': 'acta-entrega-soporte',
        'name': 'Acta de Entrega y Política de Soporte',
        'description': 'Cierre formal del proyecto y condiciones del soporte post-lanzamiento.',
        'style': DocumentStyle.LEGAL,
        'header_title': 'Acta de Entrega y Soporte',
        'html_template': ACTA_HTML,
        'fields': [
            text('nombre_proyecto', 'Nombre del proyecto'),
            text('nombre_cliente', 'Nombre del cliente / empresa'),
            date('fecha_entrega', 'Fecha de entrega'),
            text('link_repositorio', 'Repositorio (link o plataforma)'),
            text('canal_entrega_accesos', 'Canal seguro de entrega de accesos'),
            text('fecha_capacitacion', 'Fecha de capacitación', required=False),
            area('observaciones', 'Observaciones'),
            text('dias_soporte_incluido', 'Días de soporte incluido', '30'),
        ],
    },
    {
        'slug': 'propuesta-comercial',
        'name': 'Propuesta Comercial',
        'description': 'Documento de venta: problema, solución, fases, inversión y garantías.',
        'style': DocumentStyle.COMERCIAL,
        'header_title': 'Propuesta Comercial',
        'html_template': PROPUESTA_HTML,
        'fields': [
            text('nombre_cliente', 'Nombre del cliente / empresa'),
            date('fecha', 'Fecha'),
            text('validez_dias', 'Validez (días)', '15'),
            area('resumen_problema', 'Lo que nos contaste (el problema en sus palabras)'),
            area('descripcion_solucion', 'Lo que proponemos (en lenguaje de negocio)'),
            {
                'key': 'fases',
                'label': 'Fases del proyecto',
                'type': 'table',
                'columns': [
                    {'key': 'nombre', 'label': 'Fase'},
                    {'key': 'incluye', 'label': 'Qué incluye'},
                    {'key': 'duracion', 'label': 'Duración estimada'},
                ],
                'min_rows': 3,
                'default': [
                    {
                        'nombre': '1. Descubrimiento & Arquitectura',
                        'incluye': 'Mapa del proceso, propuesta técnica definitiva',
                        'duracion': '1 semana',
                    },
                    {
                        'nombre': '2. Desarrollo & Pruebas',
                        'incluye': '',
                        'duracion': '',
                    },
                    {
                        'nombre': '3. Despliegue & Capacitación',
                        'incluye': 'Puesta en producción, capacitación del equipo',
                        'duracion': '1 semana',
                    },
                ],
            },
            area('fuera_de_alcance', 'Explícitamente fuera de alcance'),
            text('valor_total', 'Valor total (COP)'),
            text('forma_pago', 'Forma de pago', '40% inicio / 30% avance / 30% entrega'),
            text('dias_soporte_incluido', 'Días de soporte incluido', '30'),
        ],
    },
]


class Command(BaseCommand):
    help = 'Crea o actualiza las plantillas de documento de KiboCode.'

    def handle(self, *args, **options):
        for data in TEMPLATES:
            slug = data.pop('slug')
            template, created = DocumentTemplate.objects.update_or_create(
                slug=slug, defaults=data
            )
            verb = 'creada' if created else 'actualizada'
            self.stdout.write(self.style.SUCCESS(f'Plantilla {verb}: {template.name}'))
