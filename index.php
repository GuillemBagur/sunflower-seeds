<!--- This code is licensed under MIT License
Copyright (c) 2021-present Guillem Uriel Baugr Moll and other contributors
-->

<!DOCTYPE html>
<html lang="es" dir="ltr">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="utf-8">
  <title>Sunflower Seeds - Una app que te ayuda a leer</title>
  <link rel="stylesheet" href="master.css">
  <link rel="stylesheet" href="font-family.css">
  </link>
  <link rel="stylesheet" href="../icofont/icofont.min.css">
  <link rel="shortcut icon" href="../logo.ico">
</head>

<body>
  <?php require('langs.php'); ?>
  <?php
  $gettingTextFromCode = isset($_GET['text']);
  $givenText = "";
  if ($gettingTextFromCode) {
    $code = $_GET['text'];
    require_once('../jucar/upload/conexion.php');
    $givenText = mysqli_query($conexion, "SELECT TEXT FROM sunflowerseeds WHERE CODE = '$code'");
    $givenText = mysqli_fetch_array($givenText, MYSQLI_ASSOC)["TEXT"];
  }
  ?>

  <!-- These three elements are to let the user to choose the page of a PDF OCR-->
  <span id="current-page-num" hidden></span>
  <span id="total-pages-num" hidden></span>
  <div id="pdf-contents" hidden></div>


  <div id="background" class="background"></div>

  <div id="modal" class="modal hidden"></div>

  <div id="notice-board" class="notice-board popup">
    <h2><?php echo ($text[$lang]['notice-board']['title']); ?> </h2>
    <p><?php echo ($text[$lang]['notice-board']['text'][0]); ?></p>
    <?php echo ($text[$lang]['notice-board']['text'][1]); ?>
    <br>
    <br>
    <?php echo ($text[$lang]['notice-board']['text'][2]); ?>
    <p><?php echo ($text[$lang]['notice-board']['text'][3]); ?></p>
  </div>

  <div id="share-app" class="share-app popup">
    <h2><?php echo ($text[$lang]['share-app']['title']); ?></h2>
    <p>
      <?php echo ($text[$lang]['share-app']['text'][0]); ?>

      <br />
      <br />
      <?php echo ($text[$lang]['share-app']['text'][1]); ?>
      <br />
      <label><input type="checkbox" id="show-share-app" /> <?php echo ($text[$lang]['share-app']['text'][2]); ?> </label>
    </p>

  </div>

  <div id="menu" class="menu popup">
    <div class="bordes-redondeados"></div>
    <a class="btn btn-dark btn-speech" id="btn-speech" title="Escuchar el texto le&iacute;do por una voz en off">
      <i class="icofont-audio"></i> <?php echo ($text[$lang]['tools'][0]); ?>
    </a>

    <a class="btn btn-dark btn-import-text" title="Importar texto desde una imagen o documento">
      <i class="icofont-file-text"></i> <?php echo ($text[$lang]['tools'][2]); ?>
    </a>

    <a class="btn btn-dark btn-options" href="#top-options" title="Abrir el panel de opciones">
      <i class="icofont-options"></i> <?php echo ($text[$lang]['tools'][4]); ?>
    </a>

    <a class="btn btn-dark btn-options" title="Historial de textos">
      <i class="icofont-history"></i> <?php echo ($text[$lang]['tools'][6]); ?>
    </a>

    <a class="btn btn-dark btn-share-text" title="Historial de textos">
      <i class="icofont-share"></i> Compartir
    </a>

    <a class="btn btn-dark btn-options" href="#lang" title="Cambiar el idioma">
      <i class="icofont-globe"></i> <?php echo ($text[$lang]['tools'][5]); ?>
    </a>

  </div>

  <div id="options" class="options popup">
    <a name="top-options"></a>
    <a name="text-format"></a>
    <fieldset>
      <legend><?php echo ($text[$lang]['options']['text-format']['title']); ?></legend>
      <label for="font-size"><span title="Cambia el tamano de fuente"><?php echo ($text[$lang]['options']['text-format']['labels'][0]); ?></span></label>
      <input type="range" min="35" max="100" class="slider app-option option-input" name="font-size" id="font-size">
      <div class="options-values" id="font-size-value"></div>

      <label for="line-height"><span title="Cambia el espaciado entre líneas"><?php echo ($text[$lang]['options']['text-format']['labels'][1]); ?></span></label>
      <input type="range" min="20" max="150" class="slider app-option option-input" name="line-height" id="line-height">
      <div class="options-values" id="line-height-value"></div>

      <label for="word-spacing"><span title="Cambia el espaciado entre palabras"><?php echo ($text[$lang]['options']['text-format']['labels'][2]); ?></span></label>
      <input type="range" min="0" max="60" class="slider app-option option-input" name="word-spacing" id="word-spacing">
      <div class="options-values" id="word-spacing-value"></div>

      <label for="letter-spacing"><span title="Cambia el espaciado entre palabras"><?php echo ($text[$lang]['options']['text-format']['labels'][5]); ?></span></label>
      <input type="range" min="0" value="5" max="60" class="slider app-option option-input" name="letter-spacing" id="letter-spacing">
      <div class="options-values" id="letter-spacing-value"></div>

      <label><?php echo ($text[$lang]['options']['text-format']['labels'][3]); ?></label>
      <select id="font-family" class="select-fnt-lang app-option" name="select-fnt-lang">
        <i class="icofont-caret-down"></i>
        <option value="Helvetica">Helvetica</option>
        <option value="opendyslexic">Open Dyslexic</option>
        <option value="arial">Arial</option>
        <option value="Calibri Light">Calibri</option>
        <option value="PlaytimeWithHotToddiesOblique">Playtime</option>
        <option value="Comic Sans MS">Comic Sans</option>
        <option value="Verdana">Verdana</option>
      </select>

      <label><?php echo ($text[$lang]['options']['text-format']['labels'][6]); ?></label>
      <select id="text-align" class="select-fnt-lang app-option" name="select-fnt-lang">
        <i class="icofont-caret-down"></i>
        <option value="left"><?php echo ($text[$lang]['options']['text-format']['text-align'][0]); ?></option>
        <option value="center"><?php echo ($text[$lang]['options']['text-format']['text-align'][1]); ?></option>
        <option value="right"><?php echo ($text[$lang]['options']['text-format']['text-align'][2]); ?></option>
        <option value="justify"><?php echo ($text[$lang]['options']['text-format']['text-align'][3]); ?></option>
      </select>
    </fieldset>

    <a name="text-color"></a>
    <fieldset>
      <legend><?php echo ($text[$lang]['options']['colors']['title']); ?></legend>
      <label><?php echo ($text[$lang]['options']['colors']['labels'][0]); ?></label><input type="color" id="background-color" class="app-option" value="#ffffff"><br>
      <label><?php echo ($text[$lang]['options']['colors']['labels'][1]); ?></label><input type="color" id="color" class="app-option" value="#000000"><br>

      <label for="word-spacing"><span><?php echo ($text[$lang]['options']['colors']['labels'][2]); ?></span></label>
      <div id="colored-letters"></div>
      <input type="text" id="new-letter" class="one-char" maxlength="1" onkeypress="return checkAvailableLetter(event);">
      <input type="color" id="letter-color" value="#5401d0">
      <a id="add-letter" class="btn btn-dark"><i class="icofont-plus-circle"></i> <?php echo ($text[$lang]['options']['colors']['labels'][3]); ?></a>
    </fieldset>

    <fieldset>
      <legend><?php echo ($text[$lang]['options']['lang']['title']); ?></legend>
      <a name="lang"></a>
      <a name="audio"></a>
      <label><i class="icofont-globe"></i><?php echo ($text[$lang]['options']['lang']['labels'][0]); ?></label>
      <select id="langsel" class="select-fnt-lang app-option">
        <option selected value='es'>Espa&ntildeol</option>
        <option value='ca'>Catal&agrave;</option>
        <option value='en'>English</option>
      </select>


      <label><i class="icofont-globe"></i><i class="icofont-audio"></i> <?php echo ($text[$lang]['options']['lang']['labels'][1]); ?></label>
      <select id="audio-langsel" class="select-fnt-lang app-option automatic-select"></select>

      <label><i class="icofont-globe"></i><i class="icofont-audio"></i> <?php echo ($text[$lang]['options']['lang']['labels'][2]); ?></label>
      <select id="audio-accentsel" class="select-fnt-lang app-option automatic-select"></select>

      <label for="font-size"><span title="Cambia la velocidad de la voz en off"><?php echo ($text[$lang]['options']['lang']['labels'][3]); ?></span></label>
      <input type="range" min=".25" max="2" step=".25" value="1" class="slider app-option option-input" id="speech-rate">

      <label><input type="checkbox" id="speech-highlight">
        <?php echo ($text[$lang]['options']['lang']['labels'][4]); ?></label>
      <br>
      <label><?php echo ($text[$lang]['options']['lang']['labels'][5]); ?></label><input type="color" id="highlight-color" class="app-option" value="#ffffff"><br>
    </fieldset>
  </div>


  <div id="read" class="read popup">
    <a class="btn btn-dark btn-options" href="#text-color">
      <i class="icofont-options"></i> Resaltar letras
    </a>
    <div class="div-text">
      <!--  <div id="display-text" class="text"></div>-->
    </div>

  </div>


  <div id="import-text" class="import-text popup">
    <div class="styler-wrapper">
      <div class="input-styler">
        <i class="icofont-upload-alt"></i>
        <input type="file" id="import-file">
      </div>
    </div>

    <?php echo ('
        <input type="text" id="scraping-url" placeholder="' . $text[$lang]['import-text'][1] . '">
        <a class="btn" id="search-web">' . $text[$lang]['import-text'][2] . '</a>
      '); ?>

    <input type="text" id="shared-code" placeholder="Código"><a onclick="getTextFromCode()" class="btn" id="get-text-from-code">Buscar</a>
  </div>

  <div id="text-history" class="text-history popup">
    <ul id="saved-texts"></ul>
  </div>


  <div id="share-text" class="share-text popup">
    <form>
      <input id="share-code" type="text" value="<?php echo ($_GET['code']) ?>" disabled>
      <a class="btn" onclick="copyFrom('share-code')"><i class="icofont-ui-copy"></i> Copiar c&oacute;digo</a>
    </form>
  </div>


  <div id="canvas-wrapper" class="canvas-wrapper popup">
    <a class="btn" id="btn-ocr"><?php echo ($text[$lang]['options']['text-format']['labels'][4]); ?></a>
    <select class="" id="ocr-lang">
      <option value="spa">Idioma</option>
      <option value="spa">Español</option>
      <option value="eng">Inglés</option>
      <option value="cat">Catalán</option>
      <option value="spa">Otros</option>
    </select>
    <div id="canvas-div" class="canvas-div">
      <canvas id="show-img" width="3000" height="2000"></canvas>

      <canvas id="canvas" width="3000" height="2000"></canvas>
    </div>
    <canvas id="ocr-src" width="1000" height="700"></canvas>

  </div>

  <div class="wrapper">
    <div class="tools">
      <a class="btn btn-dark" id="btn-menu"><i class="icofont-navigation-menu"></i></a>
      <div class="bordes-redondeados"></div>
      <a class="btn btn-dark btn-speech" id="btn-speech" title="Escuchar el texto le&iacute;do por una voz en off">
        <i class="icofont-audio"></i> <?php echo ($text[$lang]['tools'][0]); ?>
      </a>

      <a class="btn btn-dark btn-options" href="#audio" title="Cambiar el idioma y el acento de la voz">
        <i class="icofont-options"></i> <?php echo ($text[$lang]['tools'][1]); ?>
      </a>

      <div class="division"></div>

      <a class="btn btn-dark btn-import-text" title="Importar texto desde una imagen o documento">
        <i class="icofont-file-text"></i> <?php echo ($text[$lang]['tools'][2]); ?>
      </a>

      <!-- It's not necessary to have an external panel for Highlighting letters
        <a class="btn btn-dark btn-read" id="btn-read" title="Poder leer c&oacute;modamente el texto con las letras confusas resaltadas">
          <i class="icofont-read-book-alt"></i> Leer
        </a>-->

      <a class="btn btn-dark btn-options" href="#text-format" title="Cambiar la fuente, el tama&ntilde;o y otras opciones de formato">
        <i class="icofont-options"></i> <?php echo ($text[$lang]['tools'][3]); ?>
      </a>

      <div class="division"></div>

      <a class="btn btn-dark btn-options" href="#top-options" title="Abrir el panel de opciones">
        <i class="icofont-options"></i> <?php echo ($text[$lang]['tools'][4]); ?>
      </a>

      <a class="btn btn-dark btn-history" title="Historial de textos">
        <i class="icofont-history"></i> <?php echo ($text[$lang]['tools'][6]); ?>
      </a>

      <a class="btn btn-dark btn-share-text" title="Historial de textos">
        <i class="icofont-share"></i> Compartir texto
      </a>

      <a class="btn btn-dark" onclick="window.print()">
        <i class="icofont-printer"></i>
      </a>

      <a class="btn btn-dark btn-options" href="#lang" title="Cambiar el idioma">
        <i class="icofont-globe"></i> <?php echo ($text[$lang]['tools'][5]); ?>
      </a>
    </div>

    <div class="div-text">
      <a id="0" class="tab tab-1 active" onclick="toggleTabs(this)" title="(Ctrl+Flecha hacia la izquierda)"><?php echo ($text[$lang]['text']['sheets'][0]); ?></a>
      <a id="1" class="tab tab-2" onclick="toggleTabs(this)" title="(Ctrl+Flecha hacia la derecha)"><?php echo ($text[$lang]['text']['sheets'][1]); ?></a>
      <div class="text-options">
        <a class="btn" onclick="copyText()" title="(Ctrl+C)"><i class="icofont-ui-copy"></i><?php echo ($text[$lang]['text']['buttons'][0]); ?></a>
        <a class="btn" onclick="deleteText()" title="(Ctrl+Backspace)"><i class="icofont-ui-delete"></i><?php echo ($text[$lang]['text']['buttons'][1]); ?></a>
      </div>
      <div class="text-container">
        <div contenteditable="true" id="display-text" class="text"></div>
        <textarea id="text" class="text"></textarea>
      </div>
      <label class="label-overwrite" title="Sobreescribir el texto anterior con el nuevo al importar texto de un documento"><input id="overwrite" type="checkbox" checked>Sobreescribir texto</label>
    </div>
  </div>

  <script type="text/javascript">
    // Parsing an associative array from PHP to JS
    // That's for getting the translation of the feedback
    let feedback = {
      'delete': `<?php echo ($text[$lang]['feedback']['delete']); ?>`,
      'copy': `<?php echo ($text[$lang]['feedback']['copy']); ?>`,
      'ocr': `<?php echo ($text[$lang]['feedback']['ocr']); ?>`,
      'doc': `<?php echo ($text[$lang]['feedback']['doc']); ?>`,
      'scraping': `<?php echo ($text[$lang]['feedback']['scraping']); ?>`,
      'speech': `<?php echo ($text[$lang]['feedback']['speech']); ?>`,
      'not-supported-file': `<?php echo ($text[$lang]['feedback']['not-supported-file']); ?>`,
    };


    // As the Speech button's inner HTML changes dynamically (when you click on it)
    // It's necessary to load the translation from PHP to a JS variable
    let speechButtonInner = `<?php echo ($text[$lang]['tools'][0]); ?>`
  </script>


  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.min.js" integrity="sha512-qa1o08MA0596eSNsnkRv5vuGloSKUhY09O31MY2OJpODjUVlaL0GOJJcyt7J7Z61FiEgHMgBkH04ZJ+vcuLs/w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src='https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js'></script>
  <script type="text/javascript" src="http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js"></script>
  <script type="text/javascript" src="js/toggle-sheets-other-options.js"></script>
  <script type="text/javascript" src="js/miscelaneous-functions.js"></script>
  <?php
  if ($givenText != "") {
    echo ("
      <script>
        let webLoadingData = JSON.parse(getKeyData('sunflower-seeds', '{}', true));
        webLoadingData['text'][0] = `$givenText`;
        localStorage.setItem('sunflower-seeds', JSON.stringify(webLoadingData));
        window.location.href = window.location.href.split('?')[0];
      </script>
      ");
  }
  ?>
  <script type="text/javascript" src="js/display-popups.js"></script>
  <script type="text/javascript" src="js/speech.js"></script>
  <script type="text/javascript" src="js/options.js"></script>
  <script type="text/javascript" src='js/pdf-ocr.js'></script>
  <script type="text/javascript" src="js/process-imported-file.js"></script>

  <script type="text/javascript" src="js/ocr.js"></script>
  <script type="text/javascript" src="js/crop-img.js"></script>
  <script type="text/javascript" src="js/shortcuts.js"></script>
  <script type="text/javascript" src="js/scraping.js"></script>
  <script type="text/javascript" src="js/load-history.js"></script>


  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.10.100/pdf.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.10.100/pdf.worker.min.js"></script>
  <script type="text/javascript" src='js/pdf.js'></script>
  <!--<script type="text/javascript" src='js/ctxmenu/ctxmenu.js'></script>
  <script type="text/javascript" src='js/context-menus.js'></script>-->
  <script type="text/javascript" src='js/share-text.js'></script>

  <script src="https://code.responsivevoice.org/responsivevoice.js?key=n1eTMzx4"></script>


  <!--
    <script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.26.2/docxtemplater.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.1/dist/pizzip.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.1/dist/pizzip-utils.js"></script>
    <script type="text/javascript" src='js/docx.js'></script>
  -->
</body>

</html>