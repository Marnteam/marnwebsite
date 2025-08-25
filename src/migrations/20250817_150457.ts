import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "featuresBlock_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE jsonb USING jsonb_build_object(
      'root', jsonb_build_object(
        'type', 'root',
        'format', '',
        'indent', 0,
        'version', 1,
        'children', jsonb_build_array(
          jsonb_build_object(
            'type', 'paragraph',
            'format', '',
            'indent', 0,
            'version', 1,
            'children', jsonb_build_array(
              jsonb_build_object(
                'mode', 'normal',
                'text', COALESCE("content_subtitle", ''),
                'type', 'text',
                'style', '',
                'detail', 0,
                'format', 0,
                'version', 1
              )
            ),
            'direction', 'rtl',
            'textStyle', '',
            'textFormat', 0
          )
        ),
        'direction', 'rtl'
      )
    );
  ALTER TABLE "_featuresBlock_v_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE jsonb USING jsonb_build_object(
      'root', jsonb_build_object(
        'type', 'root',
        'format', '',
        'indent', 0,
        'version', 1,
        'children', jsonb_build_array(
          jsonb_build_object(
            'type', 'paragraph',
            'format', '',
            'indent', 0,
            'version', 1,
            'children', jsonb_build_array(
              jsonb_build_object(
                'mode', 'normal',
                'text', COALESCE("content_subtitle", ''),
                'type', 'text',
                'style', '',
                'detail', 0,
                'format', 0,
                'version', 1
              )
            ),
            'direction', 'rtl',
            'textStyle', '',
            'textFormat', 0
          )
        ),
        'direction', 'rtl'
      )
    );
  ALTER TABLE "featuresBlock_columns_locales" DROP COLUMN "rich_text_content";
  ALTER TABLE "_featuresBlock_v_columns_locales" DROP COLUMN "rich_text_content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "featuresBlock_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE varchar USING COALESCE("content_subtitle" #>> '{root,children,0,children,0,text}', '');
  ALTER TABLE "_featuresBlock_v_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE varchar USING COALESCE("content_subtitle" #>> '{root,children,0,children,0,text}', '');
  ALTER TABLE "featuresBlock_columns_locales" ADD COLUMN "rich_text_content" jsonb;
  ALTER TABLE "_featuresBlock_v_columns_locales" ADD COLUMN "rich_text_content" jsonb;`)
}
