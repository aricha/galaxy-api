var db = require('../../db');
var utils = require('../../lib/utils');


module.exports = function(server) {
    // Sample usage:
    // % curl -X POST 'http://localhost:5000/game/submit' -d 'name=Mario Bros&app_url=http://mariobro.se&icons=128&screenshots=yes'
    server.post({
        url: '/game/submit',
        swagger: {
            nickname: 'submit',
            notes: 'Submit game',
            summary: 'Submission'
        },
        validation: {
            app_url: {
                description: 'App URL',
                isRequired: true,
                isUrl: true
            },
            homepage_url: {
                description: 'Homepage URL',
                isRequired: false,
                isUrl: true
            },
            icons: {
                description: 'Icons',
                isRequired: true,
            },
            name: {
                description: 'Name',
                isRequired: true,
                max: 128
            },
            screenshots: {
                description: 'Screenshots',
                isRequired: true
            }
        }
    }, function(req, res) {
        var POST = req.params;
        slug = utils.slugify(POST.slug || POST.name);
        var data = {
            app_url: POST.app_url,
            appcache_path: POST.appcache_path,
            created: new Date(),
            default_locale: POST.default_locale,
            description: POST.description,
            developer: {
                name: POST.developer_name,
                url: POST.developer_url
            },
            fullscreen: POST.fullscreen,
            genre: POST.genre,
            homepage_url: POST.homepage_url,
            icons: POST.icons,
            license: POST.license,
            locales: POST.locales,
            name: POST.name,
            orientation: POST.orientation,
            privacy_policy_url: POST.privacy_policy_url,
            screenshots: POST.screenshots,
            slug: slug
        };
        db.flatfile.write('game', slug, data);
        res.json(data);
    });
};
