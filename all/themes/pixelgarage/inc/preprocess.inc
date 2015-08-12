<?php
/**
 * Created by PhpStorm.
 * User: ralph
 * Date: 06.02.15
 * Time: 17:23
 */

/**
 * Preprocess variables for the html template.
 */
function pixelgarage_preprocess_html(&$vars) {
  // make sure jQuery UI and effects is loaded for anonymous users
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'effects');

}

/**
 * Override or insert variables for the page templates.
 */
function pixelgarage_preprocess_page(&$vars) {
  // hide titles on login forms
  pg_login_preprocess_page($vars);

  // replace logo with .svg
  //$vars['logo'] = str_replace('.jpg', '.svg', $vars['logo']);
}

/**
 * Implements template_preprocess_webform_confirmation().
 */
function pixelgarage_preprocess_webform_confirmation(&$vars) {
  $webform = $vars['node'];
  $submission = webform_get_submission($webform->nid, $vars['sid']);

  // create a new NEBS posting node
  $nebs_post = new stdClass();
  $nebs_post->type = 'nebs_post';
  $nebs_post->language = LANGUAGE_NONE;
  $nebs_post->uid = 1;
  $nebs_post->status = !empty($webform->field_publish_post_immediately) ? 1 : 0;
  $nebs_post->comment = 0;
  $nebs_post->promote = 0;
  node_object_prepare($nebs_post);

// fill the node properties and save it to the database
  $nebs_post->title = $submission->data[4][0] . " " . $submission->data[6][0];
  $nebs_post->field_image[$nebs_post->language][0]['fid'] = $submission->data[1][0]; // fid
  $nebs_post->field_e_mail[$nebs_post->language][0]['email'] = $submission->data[2][0]; // email
  $nebs_post->field_name[$nebs_post->language][0]['value'] = $submission->data[4][0]; // first name
  $nebs_post->field_quote[$nebs_post->language][0]['value'] = substr($submission->data[5][0], 0, 70); // Quote
  $nebs_post->field_last_name[$nebs_post->language][0]['value'] = $submission->data[6][0]; // last name
  $nebs_post->field_canton[$nebs_post->language][0]['tid'] = _pixelgarage_convert_taxonomy('cantons', $submission->data[7][0]); // Canton
  $nebs_post->field_party[$nebs_post->language][0]['tid'] =  _pixelgarage_convert_taxonomy('parties', $submission->data[8][0]); // Party
  $nebs_post->field_parliamentarian[$nebs_post->language][0]['value'] = $submission->data[9][0] == 'yes' ? 1 : 0; // Parliamentarian

  $nebs_post = node_submit($nebs_post);
  node_save($nebs_post);

}

function _pixelgarage_convert_taxonomy($taxonomy, $key) {
  // converts canton to canton term id
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'taxonomy_term')
    ->entityCondition('bundle', $taxonomy)
    ->fieldCondition('field_shortcut', 'value', strtoupper($key))
    ->range(0, 1);
  $result = $query->execute();
  if ($result && $result['taxonomy_term']) {
    // brand exists
    foreach ($result['taxonomy_term'] as $key => $value) {
      return $key;
    }

  }

  return 0;
}
