<?php
  $availableLangs = array('es', 'ca', 'en');
  $default = 'es';

  if(isset($_GET['lang'])){
    $lang = $_GET['lang'];
    if(!in_array($lang, $availableLangs)){
      $lang = $default;
    }
  }else{
    $lang = $default;
  }

  if(empty($lang)){
    $lang = $default;
  }

  $text = array(
    'es' => array(
      'notice-board' => array(
        'title' => '¡Bienvenido/a a Sunflower Seeds 2.0!',
        'text' => array(
          'Esta nueva versi&oacute;n es m&aacute;s intuitiva y completa que la anterior.',

          'Pero si prefieres la versi&oacute;n cl&aacute;sica,
          <a href="http://sunflowerseeds.pangea.org/v1/">puedes acceder a ella
          clickando aqu&iacute;.</a>',

          '<a style="text-align: center" target="_blank" href="https://youtu.be/FE8ogNXlcLE">Ver el tutorial</a>',

          'Para continuar, simplemente haz click afuera de este cuadro de di&aacute;logo'
        )
      ),

      'share-app' => array(
        'title' => "¡Hola de nuevo!",
        'text' => array(
          'Si te ha aparecido este cartel, es porque utilizas SunflowerSeeds a menudo.
          Por ello, te damos las gracias enormemente.
          Esperemos que te esté siendo útil. Y, si es así (y si conoces a alguien a quien le pueda interesar),
          agradeceríamos que la compartas con esas personas. Con este simple gesto, aparte de apoyarnos,
          estarás haciendo del mundo un lugar un poquito mejor.',
          'Este mensaje te aparecerá de vez en cuando.',
          'No volver a mostrar'
        )
      ),

      'import-text' => array('Subir un archivo de tu PC', 'Url de un sitio web', 'Buscar'),

      'tools' => array(
        'Escuchar', 'Opciones de la voz', 'Importar texto', 'Opciones del texto',
        'Opciones', 'Idioma', 'Historial'
      ),

      'text' => array(
        'sheets' => array('Hoja 1', 'Hoja 2'),
        'buttons' => array('Copiar texto', 'Borrar texto')
      ),

      'options' => array(
        'text-format' => array(
          'title' => 'Formato del texto',
          'labels' => array(
            'Tama&ntilde;o de letra',
            'Espaciado entre l&iacute;neas',
            'Espaciado entre palabras',
            'Fuente',
            'Escanear',
            'Espaciado entre letras',
            'Alineación del texto'
          ),
          'text-align' => array(
            'Izquierda',
            'Centrado',
            'Derecha',
            'Justificado'
          )
        ),

        'colors' => array(
          'title' => 'Cambiar colores',
          'labels' => array(
            'Color del fondo',
            'Color de todas las letras',
            'Resaltar letras confusas',
            'A&ntilde;adir'
          )
        ),

        'lang' => array(
          'title' => 'Audio e idioma',
          'labels' => array(
            'Idioma del programa',
            'Idioma de la voz en off',
            'Acento de la voz en off',
            'Velocidad de la voz en off',
            'Resaltar la palabra que est&aacute; leyendo la voz en off',
            'Color de resaltado'
          )
        ),

        ),

        'feedback' => array(
          'speech' => '
            <h4><i class="icofont-megaphone"></i><span class="i-sound">)</span>
            <span class="i-sound second">)</span>Estamos leyendo el texto por ti :)</h4>
            Puedes cambiar el acento en configuraci&oacuten',

          'ocr' => '
            <h4><i class="icofont-options"></i>La imagen est&aacute siendo procesada</h4>
            Puedes seguir usando la aplicaci&oacuten mientras esperas',

          'doc' => '
            <h4><i class="icofont-options"></i>El documento est&aacute siendo procesado</h4>
            Puedes seguir usando la aplicaci&oacuten mientras esperas',

          'scraping' => '
            <h4><i class="icofont-options"></i>El sitio web est&aacute siendo procesado</h4>
            Puedes seguir usando la aplicaci&oacuten mientras esperas',

          'delete' => '
            <h4><i class="icofont-delete-alt"></i>
            <i class="icofont-file-text to-delete"></i>Texto borrado para siempre...</h4>
            (eso es mucho tiempo)',

          'copy' => '
            <h4><i class="icofont-file-text copy"></i>
            <i class="icofont-file-text"></i>¡Texto copiado!</h4>
            Lo encontrar&aacutes en el portapapeles',

          'not-supported-file' => '
            <h4><i class="icofont-ban"></i>Error al subir el texto</h4>
            Lo sentimos, pero solamente procesamos imágenes y documentos PDF. De momento.'
        )
    ),



    'en' => array(
      'notice-board' => array(
        'title' => 'Welcome to SunflowerSeeds 2.0!',
        'text' => array(
          'This version is more intuitive than the previous one.',

          'But if you still prefer the classic version,
          <a href="http://sunflowerseeds.pangea.org/v1/">you can use it by clicking here.</a>',

          '<a style="text-align: center" target="_blank" href="https://youtu.be/FE8ogNXlcLE">Watch the tutorial</a>',

          'To use the app, simply click outside this dialogue box.'
        )
      ),

      'import-text' => array('Upload a file from your PC', 'URL of a website', 'Search'),

      'tools' => array(
        'Hear', 'Voice options', 'Import text', 'Text options',
        'Options', 'Language', 'History'
      ),

      'text' => array(
        'sheets' => array('Sheet 1', 'Sheet 2'),
        'buttons' => array('Copy text', 'Erase text')
      ),

      'options' => array(
        'text-format' => array(
          'title' => 'Text format',
          'labels' => array(
            'Font size',
            'Line height',
            'Word spacing',
            'Font',
            'Scan',
            'Letter spacing',
            'Text align'
          ),
          'text-align' => array(
            'Left',
            'Center',
            'Right',
            'Justify'
          )
        ),

        'colors' => array(
          'title' => 'Change colors',
          'labels' => array(
            'Background color',
            'Letter color',
            'Change the color of confusing letters',
            'Add'
          )
        ),

        'lang' => array(
          'title' => 'Audio and language',
          'labels' => array(
            'App language',
            'Voice language',
            'Voice accent',
            'Change speaking speed',
            'Highlight current word (Text to speech)',
            'Highlight color'
          )
        ),

        ),

        'feedback' => array(
          'speech' => '
            <h4><i class="icofont-megaphone"></i><span class="i-sound">)</span>
            <span class="i-sound second">)</span>We\'re reading the text for you :)</h4>
            You can change the voice options by going to \'voice options\'',

          'ocr' => '
            <h4><i class="icofont-options"></i>The image is being processed</h4>
            Meanwhile, you can continue using the app',

          'doc' => '
            <h4><i class="icofont-options"></i>The document is being processed</h4>
            Meanwhile, you can continue using the app',

          'scraping' => '
            <h4><i class="icofont-options"></i>The website is being processed</h4>
            Meanwhile, you can continue using the app',

          'delete' => '
            <h4><i class="icofont-delete-alt"></i>
            <i class="icofont-file-text to-delete"></i>Text erased, for ever...</h4>
            (that\'s a lot of time!)',

          'copy' => '
            <h4><i class="icofont-file-text copy"></i>
            <i class="icofont-file-text"></i>Copied text!</h4>
            You\'ll find it at the clipboard',

          'not-supported-file' => '
            <h4><i class="icofont-ban"></i>Error while uploading file</h4>
            We\'re sorry, but at the moment we only can process images and PDF files'
        )
    ),




    'ca' => array(
      'notice-board' => array(
        'title' => 'Benvingut/da a Sunflower Seeds 2.0!',
        'text' => array(
          'Aquesta nova versi&oacute; &eacute;s m&eacute;s intu&iuml;tiva i
          complerta que l\'anterior.',

          'Per&ograve;, si prefereixes la versi&oacute; cl&agrave;ssica,
          <a href="http://sunflowerseeds.pangea.org/v1/">pots accedir-hi fent
          clic aqu&iacute;.</a>',

          '<a style="text-align: center" target="_blank" href="https://youtu.be/FE8ogNXlcLE">Ver el tutorial</a>',

          'Para continuar, simplemente haz click afuera de este cuadro de di&aacute;logo'
        )
      ),

      'import-text' => array('Puja un arxiu des del teu ordinador', 'Url d\'un lloc web', 'Buscar'),

      'tools' => array(
        'Escoltar', 'Opcions de la veu', 'Importar un texte', 'Opcions de format',
        'Opcions', 'Idioma', 'Historial'
      ),

      'text' => array(
        'sheets' => array('Fulla 1', 'Fulla 2'),
        'buttons' => array('Copiar el texte', 'Esborrar el texte')
      ),

      'options' => array(
        'text-format' => array(
          'title' => 'Format del texte',
          'labels' => array(
            'Tamany de lletra',
            'Espaiat entre l&iacute;nies',
            'Espaiat entre paraules',
            'Font',
            'Escanejar',
            'Espaiat entre lletres',
            'Alineació del text'
          ),
          'text-align' => array(
            'Esquerra',
            'Centrat',
            'Dreta',
            'Justificat'
          )
        ),

        'colors' => array(
          'title' => 'Canviar colors',
          'labels' => array(
            'Color de fons',
            'Color de totes les lletres',
            'Ressaltar lletres confoses',
            'Afegir'
          )
        ),

        'lang' => array(
          'title' => '&Agrave;udio i idioma',
          'labels' => array(
            'Idioma del programa',
            'Idioma de la veu en off',
            'Accent de la veu en off',
            'Velocitat de la veu en off',
            'Ressaltar la paraula que est&agrave; llegint la veu en off',
            'Color de ressaltat'
          )
        ),
      ),

      'feedback' => array(
        'speech' => '
          <h4><i class="icofont-megaphone"></i><span class="i-sound">)</span>
          <span class="i-sound second">)</span>Estem llegint el texte per tu :)</h4>
          Si empres Chrome, pots canviar l\'accent anant a configuraci&oacute;',

        'ocr' => '
          <h4><i class="icofont-options"></i>La imatge est&agrave; sent processada</h4>
          Pots seguir emprant l\'aplicaci&oacute; mentre esperes',

        'doc' => '
          <h4><i class="icofont-options"></i>El document est&agrave; sent processat</h4>
          Pots seguir emprant l\'aplicaci&oacute; mentre esperes',

        'scraping' => '
          <h4><i class="icofont-options"></i>El lloc web est&agrave; sent processat</h4>
          Pots seguir emprant l\'aplicaci&oacute; mentre esperes',

        'delete' => '
          <h4><i class="icofont-delete-alt"></i>
          <i class="icofont-file-text to-delete"></i>El texte ha sigut borrat per sempre...</h4>
          (aix&ograve; &eacute;s molt de temps)',

        'copy' => '
          <h4><i class="icofont-file-text copy"></i>
          <i class="icofont-file-text"></i>Texte copiat!</h4>
          El trobar&agrave;s al porta-retalls',

        'not-supported-file' => '
          <h4><i class="icofont-ban"></i>Errada processant l\'arxiu</h4>
          Ens sap greu, per&ograve; nom&eacute;s processem imatges i documents PDF. De moment.'
      )
    ),
  );
?>
